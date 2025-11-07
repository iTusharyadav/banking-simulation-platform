import React, { useEffect, useState } from 'react';
import LandingPage from './Components/LandingPage/LandingPage.js';
import { Routes, Route } from "react-router-dom"
import './App.css';
import axios from "./Components/Utills/AxiosWithJWT.js"
import Login from './Components/Registration/Login.js';
import Register from './Components/Registration/Register.js';
import Dashboard from './Components/Dashboard/Dashboard.js';
import Profile from './Components/Profile/Profile.js';
import AboutUs from './Components/AboutUs/AboutUs.js';
import ErrorPage from './Components/ErrorPage/ErrorPage.js';
import DashBoardBalance from './Components/Dashboard/DashBoardBalance.js';
import DashBoardTransactions from './Components/Dashboard/DashBoardTransactions.js';
import DashboardTransferMoney from './Components/Dashboard/DashboardTransferMoney.js';
import Admin from './Components/Admin/Admin.js'
import Accounts from './Components/Admin/FindAllAccounts.js';
import AddBeneficiary from './Components/Beneficiary/AddBeneficiary.js';
import SeeUserBeneficiaries from './Components/Beneficiary/SeeUserBeneficiaries.js';

import AdminTransaction from './Components/Transaction/AdminTransaction.js';
import DashboardAdmin from './Components/Admin/DashboardAdmin.js';
import Requests from './Components/Admin/Requests.js';
import Protected from './Components/Protected/Protected.js';
import RegisterOTPVerification from './Components/Registration/RegisterOTPVerification.js';
import ForgotPassword from './Components/Registration/ForgotPassword.js';
import ResetPassword from './Components/Registration/ResetPassword.js';
import ChangePassword from './Components/Registration/ChangePassword.js';
import ContactUs from './Components/ContactUs/ContactUs.js';



function App() {
  return (

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Register />} />
      <Route path='/signup/otp' element={<RegisterOTPVerification />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/change-password' element={<ChangePassword />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/balance' element={<Protected Component={DashBoardBalance} />} />
      <Route path='/dashboard/Stmt' element={<Protected Component={DashBoardTransactions} />} />
      <Route path='/dashboard/trx' element={<Protected Component={DashboardTransferMoney} />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='*' element={<ErrorPage />} />
      <Route path='/admin/dashboard' element={<DashboardAdmin />} />
      <Route path='/admin/dashboard/accounts' element={<Accounts />} />
      <Route path='/dashboard/trx/seebene' element={<Protected Component={SeeUserBeneficiaries} />} />
      <Route path='/dashboard/trx/addbene' element={<Protected Component={AddBeneficiary} />} />
      <Route path='/admin/dashboard/transactions' element={<AdminTransaction />} />
      <Route path='/admin/dashboard/requests' element={<Requests />} />

    </Routes>
  );
}

export default App;
