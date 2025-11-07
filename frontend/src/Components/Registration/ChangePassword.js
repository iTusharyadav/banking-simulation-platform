import React, { useEffect, useState } from 'react';
import axios from '../Utills/AxiosWithJWT.js';
import { useNavigate } from 'react-router-dom';
import { useBankingSystem } from '../Context/UserContext.js';
import { toast } from 'react-hot-toast';

const ChangePassword = () => {
  const navigateTo = useNavigate();
  const { BASE_URL } = useBankingSystem();

  const userId = sessionStorage.getItem("userId");

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) navigateTo("/");
  }, [navigateTo]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (confirmNewPassword !== newPassword) {
      toast.error("New password does not match");
      return;
    }

    try {
      const data = { oldPassword, newPassWord: confirmNewPassword };
      const resp = await axios.post(`${BASE_URL}/api/v1/user/change-password/${userId}`, data);

      if (resp.status === 200) {
        toast.success("Password changed successfully! Please login.");
        navigateTo("/login");
      } else {
        toast.error("Password change failed!");
      }
    } catch (err) {
      toast.error("Error changing password!");
      console.error(err);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700 sm:p-8">
        <h2 className="mb-6 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          Change Password
        </h2>
        <form onSubmit={handleChangePassword} className="space-y-4 md:space-y-5">
          <div>
            <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              placeholder="••••••••"
              className="w-full p-2.5 text-gray-900 bg-gray-50 border rounded-lg sm:text-sm focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="••••••••"
              className="w-full p-2.5 text-gray-900 bg-gray-50 border rounded-lg sm:text-sm focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              placeholder="••••••••"
              className="w-full p-2.5 text-gray-900 bg-gray-50 border rounded-lg sm:text-sm focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Change Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
