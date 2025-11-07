import React, { useEffect } from 'react';
import dashimg from "../../assets/images/Welcome_dashboard.png";
import axios from "../Utills/AxiosWithJWT.js";
import { useBankingSystem } from '../Context/UserContext.js';
import { toast } from 'react-hot-toast';
import { useNavigate, NavLink } from 'react-router-dom';

const DashboardMain = () => {
  const navigateTo = useNavigate();
  const { BASE_URL, userDetails, setUser: setUserDetails, gettingAUser } = useBankingSystem();

  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) {
      navigateTo("/");
      return;
    }
    gettingAUser();
  }, []);

  useEffect(() => {
    if (userDetails?.role === "ADMIN") {
      navigateTo("/admin/dashboard");
    }
  }, [userDetails]);

  const accountNo = userDetails?.accounts?.[0]?.accountno ?? 0;

  const handleAccountOpnReq = async (e) => {
    e.preventDefault();

    const details = userDetails?.userdetails;
    if (!details?.adhaar || !details?.pan || !details?.mobile || !details?.gender) {
      toast.error("Please update your profile first");
      return;
    }

    if (userDetails?.accountopenningreq === false) {
      const resp = await axios.put(`${BASE_URL}/api/v1/user/acopreq/${userDetails?.userId}`);
      setUserDetails(resp.data);
      toast.success("Request sent successfully!");
    } else {
      toast.success("Already requested for account opening!");
    }
  };

  if (!accountNo) {
    return (
      <section className="h-[80vh] border">
        <div className="dash_hero flex flex-row justify-around items-center pt-[1rem]">
          <div className="w-[20rem] bg-[#f1f2f6] p-[1rem] rounded-lg text-center">
            <button
              onClick={handleAccountOpnReq}
              className="text-[#2d3436] text-[1.5rem] font-semibold rounded-lg"
            >
              Click here to apply for Account Opening!
            </button>
          </div>

          <div>
            <img
              src={dashimg}
              className="w-[40rem]"
              alt="dashboard_welcome_image"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="h-[80vh] bg-gray-600 border pt-[2rem]">
      <h2 className="text-[1.5rem] text-[#f1f2f6] font-semibold text-center">
        Dashboard
      </h2>
      <div className="flex flex-row justify-around items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <h3 className="text-[1.2rem] text-[#f1f2f6]">Operations</h3>
          <NavLink to="/dashboard/balance">
            <button className="w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded">
              Check balance
            </button>
          </NavLink>
          <NavLink to="/dashboard/trx">
            <button className="w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded">
              Transfer Amount
            </button>
          </NavLink>
          <NavLink to="/dashboard/Stmt">
            <button className="w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded text-center">
              Statements
            </button>
          </NavLink>
        </div>

        <div>
          <h2 className="text-[2rem] text-[#f1f2f6] w-[50rem] text-center">
            Congratulations! Your bank account has been created!
          </h2>
        </div>
      </div>
    </section>
  );
};

export default DashboardMain;
