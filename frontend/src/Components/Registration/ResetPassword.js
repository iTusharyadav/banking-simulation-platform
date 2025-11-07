import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useBankingSystem } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { BASE_URL } = useBankingSystem();
  const navigateTo = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = new URLSearchParams(window.location.search).get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const resp = await axios.post(`${BASE_URL}/api/v1/user/reset-password/${token}`, { password });
      if (resp.status === 200) {
        toast.success("Password reset successful! Please login.");
        navigateTo("/login");
      }
    } catch (err) {
      toast.error("Failed to reset password!");
      console.error(err);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
