import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../Utills/AxiosWithJWT.js';
import { toast } from 'react-hot-toast';
import { useBankingSystem } from "../Context/UserContext.js";
import NavbarDashboardAdmin from '../Admin/NavbarDashboardAdmin.js';

const AdminTransaction = () => {
  const navigateTo = useNavigate();
  const { BASE_URL, userDetails } = useBankingSystem();
  const [accno, setAccno] = useState("");
  const [transactionDetails, setTransactionDetails] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) navigateTo("/");
  }, [navigateTo]);

  if (userDetails?.role !== "ADMIN") {
    navigateTo("/dashboard");
    return null;
  }

  const getAllTransactions = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.get(`${BASE_URL}/transactions/transaction`);
      setTransactionDetails(resp.data || []);
      resp.status === 200
        ? toast.success(resp.data?.length ? "Transactions Loaded!" : "No Transactions Found!")
        : toast.error("Error fetching transactions!");
    } catch (error) {
      console.log(error);
      toast.error("Error fetching transactions!");
    }
  };

  const getAllAccTransactions = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.get(`${BASE_URL}/transactions/bankaccount/${accno}`);
      setTransactionDetails(resp.data || []);
      resp.status === 200
        ? toast.success(resp.data?.length ? "Data Found" : "Data Not Found")
        : toast.error("Invalid Credentials!");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <>
      <NavbarDashboardAdmin />
      <section className='min-h-[84vh] bg-blue-50 border-t border-gray-300 pt-8 px-10'>
        <h1 className="text-4xl font-bold text-blue-900 mb-6">All Transactions</h1>

        <div className='flex flex-wrap items-center gap-4 mb-4'>
          <button
            className="px-4 py-2 bg-white rounded shadow hover:bg-blue-600 hover:text-white transition"
            onClick={getAllTransactions}>
            All Transactions
          </button>

          <form className='flex items-center gap-2' onSubmit={getAllAccTransactions}>
            <label htmlFor="accno">Account No:</label>
            <input
              type="text"
              id="accno"
              name="accno"
              placeholder="Account No"
              className="px-2 py-1 rounded border"
              onChange={(e) => setAccno(e.target.value)}
              minLength="8"
              maxLength="8"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white rounded shadow hover:bg-blue-600 hover:text-white transition">
              Find
            </button>
          </form>

          <button
            className="px-4 py-2 bg-white rounded shadow hover:bg-blue-600 hover:text-white transition"
            onClick={() => navigateTo("/admin/dashboard")}>
            Back
          </button>
        </div>

        {transactionDetails?.length ? (
          <div className='overflow-x-auto bg-white rounded shadow p-4'>
            <table className="min-w-full text-center border-collapse border border-gray-200">
              <thead className="bg-blue-200 text-blue-900 font-semibold">
                <tr>
                  <th className="p-2 border">Tr_Id</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Time</th>
                  <th className="p-2 border">From</th>
                  <th className="p-2 border">To</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionDetails.map((transaction) => (
                  <tr key={transaction.transactionId} className="hover:bg-gray-100">
                    <td className="p-2 border">{transaction.transactionId}</td>
                    <td className="p-2 border">{transaction.transactionDate}</td>
                    <td className="p-2 border">{transaction.transactionTime}</td>
                    <td className={`p-2 border ${transaction.fromAccount === accno ? 'bg-yellow-200' : ''}`}>{transaction.fromAccount}</td>
                    <td className={`p-2 border ${transaction.toAccount === accno ? 'bg-yellow-200' : ''}`}>{transaction.toAccount}</td>
                    <td className="p-2 border">{transaction.amount} &#8377;</td>
                    <td className="p-2 border">{transaction.description}</td>
                    <td className="p-2 border">
                      {transaction.transactionStatus === 'Completed' ? (
                        <span className="text-green-600 font-semibold">Completed</span>
                      ) : (
                        <span className="text-red-600 font-semibold">{transaction.transactionStatus}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-gray-700 mt-4'>Click a button to view transactions.</p>
        )}
      </section>
    </>
  );
};

export default AdminTransaction;
