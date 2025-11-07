import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useBankingSystem } from "../Context/UserContext";

const Login = () => {
  const navigateTo = useNavigate();
  const { BASE_URL, gettingAUser } = useBankingSystem();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const TOKEN_EXPIRY_DURATION = 15 * 60 * 1000;

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(`${BASE_URL}/api/v1/login`, { email, password });

      if (!resp.data.user.emailVerified) {
        toast.error("Email is not verified!");
        navigateTo("/signup/otp");
        return;
      }

      sessionStorage.setItem("jwtToken", resp.data.jwtToken);
      sessionStorage.setItem("userId", resp.data.user.userId);

      gettingAUser();

      setTimeout(() => {
        sessionStorage.clear();
        navigateTo("/login");
        toast.error("Session timed out, please re-login");
      }, TOKEN_EXPIRY_DURATION);

      if (resp.status === 200) {
        toast.success("Login Successful!");
        if (resp.data.user.role === "ADMIN") navigateTo("/admin/dashboard");
        else navigateTo("/dashboard");
      } else {
        toast.error("Invalid Credentials!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center font-bold text-2xl">Log in</div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={submitLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <NavLink to="/signup" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Don't have an account? Sign Up
              </NavLink>
              <p
                onClick={() => navigateTo("/forgot-password")}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Forgot Password?
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
