import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import NavbarDashboard from './NavbarDashboard.js';
import axios from "../Utills/AxiosWithJWT.js";
import { useBankingSystem } from '../Context/UserContext.js';
import { toast } from 'react-hot-toast';

const DashBoardBalance = () => {
  const navigateTo = useNavigate();
  const { BASE_URL, userDetails, gettingAUser } = useBankingSystem();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) {
      navigateTo("/");
      return;
    }

    if (!userDetails) {
      gettingAUser();
    }
  }, []);

  useEffect(() => {
    if (!userDetails?.accounts?.[0]) return;

    const accountNo = userDetails.accounts[0].accountno;

    const fetchBalance = async () => {
      try {
        const resp = await axios.get(`${BASE_URL}/account/checkbal/${accountNo}`);
        setBalance(resp?.data?.[0]?.balance ?? 0);
      } catch (error) {
        console.error("Error fetching balance:", error);
        toast.error("Failed to load balance");
      }
    };

    fetchBalance();
  }, [userDetails]);

  const userName = userDetails
    ? `${userDetails.firstname} ${userDetails.lastname}`
    : "";

  const accountNo = userDetails?.accounts?.[0]?.accountno ?? "N/A";

  return (
    <div>
      <NavbarDashboard />
      <section className="h-[80vh] bg-gray-600 border pt-[2rem]">
        <h2 className="text-[1.5rem] text-[#f1f2f6] font-semibold text-center">
          Dashboard
        </h2>

        <div className="flex flex-row justify-around items-center">
          <div className="flex flex-col justify-center items-center gap-4">
            <h3 className="text-[1.2rem] text-[#f1f2f6]">Operations</h3>
            <NavLink to="/dashboard/balance">
              <button
                className="w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded"
              >
                Check balance
              </button>
            </NavLink>
            <NavLink to="/dashboard/trx">
              <button className="w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded">
                Transfer Amount
              </button>
            </NavLink>
            <NavLink to="/dashboard/Stmt">
              <button className="w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded">
                Statements
              </button>
            </NavLink>
          </div>

          <div className="w-[50rem] text-[#f1f2f6]">
            <h2 className="text-[2rem] w-[50rem]">Available Balance</h2>
            <div className="flex flex-col justify-center items-start gap-2 mt-[3rem]">
              <h3>Name: {userName}</h3>
              <h3>Account No: {accountNo}</h3>
              <h3>Balance: ₹{balance}</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoardBalance;
