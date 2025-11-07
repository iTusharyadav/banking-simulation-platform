import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import NavbarDashboard from './NavbarDashboard.js';
import axios from '../Utills/AxiosWithJWT.js';
import { toast } from 'react-hot-toast';
import { useBankingSystem } from "../Context/UserContext.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const DashBoardTransactions = () => {
  const navigateTo = useNavigate();
  const { BASE_URL, userDetails, gettingAUser } = useBankingSystem();

  const [accNo, setAccNo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [sizeOptions] = useState([
    { label: 'Small', value: 'small' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large' }
  ]);
  const [size, setSize] = useState('normal');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  // Ensure user session exists
  useEffect(() => {
    if (!sessionStorage.getItem('jwtToken')) {
      navigateTo('/');
      return;
    }
    gettingAUser();
  }, []);

  // Set account number when userDetails load
  useEffect(() => {
    if (userDetails?.accounts?.[0]?.accountno) {
      setAccNo(userDetails.accounts[0].accountno);
    }
  }, [userDetails]);

  // Fetch transactions
  useEffect(() => {
    if (!accNo) return;

    const fetchTransactions = async () => {
      try {
        const resp = await axios.get(`${BASE_URL}/transactions/bankaccount/${accNo}`);
        setTransactions(resp.data || []);

        if (resp.data?.length === 0) toast('No transactions found');
        else toast.success('Transactions loaded successfully');
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch transactions');
        if (!userDetails?.accounts) navigateTo('/dashboard');
      }
    };

    fetchTransactions();
  }, [accNo]);

  // Column templates
  const creditBody = (row) =>
    row.fromAccount === accNo ? (
      <span className="text-red-400">-</span>
    ) : (
      <span className="text-green-500">{row.amount} ₹</span>
    );

  const debitBody = (row) =>
    row.fromAccount === accNo ? (
      <span className="text-red-500">-{row.amount} ₹</span>
    ) : (
      <span className="text-green-400">-</span>
    );

  const balanceBody = (row) => (
    <span
      className={`${
        row.fromAccount === accNo ? 'text-red-400' : 'text-green-400'
      }`}
    >
      {row.fromAccount === accNo ? row.senderBal : row.receiverBal} ₹
    </span>
  );

  const statusBody = (row) =>
    row.transactionStatus === 'Completed' ? (
      <span className="text-green-400 font-medium">Completed</span>
    ) : (
      <span className="text-red-500">{row.transactionStatus}</span>
    );

  const typeBody = (row) =>
    row.transactionStatus !== 'Completed' ? (
      <span className="text-red-400">Failed</span>
    ) : row.fromAccount === accNo ? (
      'Dt'
    ) : (
      'Cr'
    );

  return (
    <div>
      <NavbarDashboard />

      <section className="min-h-screen bg-gray-900 pt-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Sidebar Operations */}
          <aside className="flex flex-col gap-4 text-white">
            <h3 className="text-xl font-semibold">Operations</h3>
            <NavLink to="/dashboard/balance">
              <button className="w-40 p-2 bg-white text-gray-800 font-semibold rounded hover:bg-gray-200 transition">
                Check Balance
              </button>
            </NavLink>
            <NavLink to="/dashboard/trx">
              <button className="w-40 p-2 bg-white text-gray-800 font-semibold rounded hover:bg-gray-200 transition">
                Transfer Amount
              </button>
            </NavLink>
            <NavLink to="/dashboard/Stmt">
              <button
                className="w-40 p-2 bg-white text-gray-800 font-semibold rounded hover:bg-gray-200 transition"
              >
                Statements
              </button>
            </NavLink>
          </aside>

          {/* Transactions Table */}
          <main className="flex-1 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Transaction History
            </h2>

            <div className="flex justify-between items-center mb-4">
              <SelectButton
                value={size}
                onChange={(e) => setSize(e.value)}
                options={sizeOptions}
              />
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  placeholder="Search transactions"
                  onInput={(e) =>
                    setFilters({
                      global: {
                        value: e.target.value,
                        matchMode: FilterMatchMode.CONTAINS,
                      },
                    })
                  }
                />
              </span>
            </div>

            <DataTable
              value={transactions}
              paginator
              rows={6}
              rowsPerPageOptions={[6, 10, 20]}
              stripedRows
              showGridlines
              size={size}
              sortMode="multiple"
              tableStyle={{ minWidth: '30rem' }}
              filters={filters}
              paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              currentPageReportTemplate="{first} to {last} of {totalRecords}"
              emptyMessage="No transactions available"
            >
              <Column field="transactionId" sortable header="Tr. ID" />
              <Column field="transactionDate" sortable header="Date" />
              <Column field="transactionTime" sortable header="Time" />
              <Column
                field="fromAccount"
                header="Account"
                body={(row) =>
                  row.fromAccount !== accNo
                    ? row.fromAccount
                    : row.toAccount
                }
              />
              <Column header="Credit" body={creditBody} />
              <Column header="Debit" body={debitBody} />
              <Column header="Balance" body={balanceBody} />
              <Column header="Cr/Dt" body={typeBody} />
              <Column field="description" header="Description" />
              <Column header="Status" body={statusBody} />
            </DataTable>
          </main>
        </div>
      </section>
    </div>
  );
};

export default DashBoardTransactions;
