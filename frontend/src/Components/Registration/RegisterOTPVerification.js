import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBankingSystem } from "../Context/UserContext";
import { toast } from "react-hot-toast";
import SyncLoader from "react-spinners/SyncLoader";

const RegisterOTPVerification = () => {
  const navigateTo = useNavigate();
  const { BASE_URL } = useBankingSystem();

  const userId = sessionStorage.getItem("userId");
  const maxOtpCount = 3;

  const [otp, setOtp] = useState("");
  const [otpCount, setOtpCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpVerificationRegister = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(`${BASE_URL}/api/v1/otp`, { otp });
      if (resp.status === 200) {
        toast.success("Email verified successfully! Please login!");
        navigateTo("/login");
      }
    } catch (err) {
      toast.error("Error in verification!");
      console.error(err);
    }
  };

  const handleResendOTP = async () => {
    if (otpCount >= maxOtpCount) {
      toast.error("You have reached the maximum number of OTPs that can be sent.");
      return;
    }

    setIsLoading(true);
    try {
      const resp = await axios.post(`${BASE_URL}/api/v1/resend-otp/${userId}`);
      if (resp.status === 200) toast.success("OTP sent successfully");
      else toast.error("Unknown error occurred");
      setOtpCount((prev) => prev + 1);
    } catch (err) {
      toast.error("Unknown error occurred");
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
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="font-semibold text-3xl">Email Verification</div>
            <div className="text-sm font-medium text-gray-400">We have sent a code to your email!</div>
          </div>

          <form onSubmit={handleOtpVerificationRegister}>
            <div className="flex flex-col space-y-16">
              <div className="flex justify-center w-full max-w-xs mx-auto">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  placeholder="Enter OTP"
                  maxLength={6}
                />
              </div>

              <div className="flex flex-col space-y-5">
                <button
                  type="submit"
                  className="w-full py-5 bg-blue-700 text-white rounded-xl shadow-sm flex justify-center items-center"
                >
                  Verify Account
                </button>

                <div className="flex justify-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Didn't receive code?</p>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-blue-600 hover:underline"
                  >
                    Resend
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterOTPVerification;
