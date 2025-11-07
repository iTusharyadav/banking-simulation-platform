import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useBankingSystem } from '../Context/UserContext';
import SyncLoader from 'react-spinners/SyncLoader';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { BASE_URL } = useBankingSystem();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const resp = await axios.post(`${BASE_URL}/api/v1/user/forget-password`, { email });

      if (resp.status === 200) {
        toast.success("Reset password link has been sent to your email!");
      } else {
        toast.error("Unknown error occurred!");
      }
    } catch (err) {
      toast.error("Error sending reset link!");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <div className="flex justify-center items-center h-[100vh]">
      <SyncLoader size={20} margin={10} color="#5145CD" loading={isLoading} />
    </div>
  ) : (
    <section className="flex flex-col items-center justify-center h-[100vh] px-4">
      <div className="max-w-sm w-full">
        <h1 className="mb-2 text-center text-sm font-semibold text-gray-900">Reset your password</h1>
        <p className="mb-10 text-center text-sm">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleForgotPassword} className="w-full">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 block w-full px-3 h-10 rounded-md text-slate-900 bg-white shadow-sm sm:text-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-slate-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-2.5 px-4 text-white bg-slate-900 rounded-lg hover:bg-slate-700 font-semibold"
          >
            Reset your password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
