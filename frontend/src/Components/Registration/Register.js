import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useBankingSystem } from "../Context/UserContext";
import SyncLoader from "react-spinners/SyncLoader";

const Register = () => {
  const { BASE_URL } = useBankingSystem();
  const navigateTo = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, password } = userDetails;

    if (!firstname || !lastname || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password should be at least 8 characters!");
      return;
    }

    setIsLoading(true);

    try {
      const resp = await axios.post(`${BASE_URL}/api/v1/signup`, userDetails);
      sessionStorage.setItem("userId", resp.data.userId);

      if (resp.status === 200) {
        toast.success("Registration successful! Please verify your email.");
        navigateTo("/signup/otp");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error("Registration failed!");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <SyncLoader size={20} margin={10} color="#5145CD" loading={isLoading} />
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center text-2xl font-bold">Sign Up</div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {["firstname", "lastname", "email", "password"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field === "password" ? "password" : "text"}
                  value={userDetails[field]}
                  onChange={handleDetails}
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-sm text-center">
            <NavLink to="/login" className="font-medium text-gray-700 hover:text-indigo-600">
              Already have an account?
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
