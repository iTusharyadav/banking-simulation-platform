import axios from "../Utills/AxiosWithJWT.js";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

// Hook to access user context easily
export function useBankingSystem() {
  return useContext(UserContext);
}

// Provider component
export const UserContextProvider = ({ children }) => {
  const navigateTo = useNavigate();
  const BASE_URL = "http://localhost:8081";

  const [userDetails, setUserDetails] = useState(null);

  const setUser = (details) => {
    console.log("Setting user details:", details);
    setUserDetails(details);
  };

  const gettingAUser = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return;

      const resp = await axios.get(`${BASE_URL}/api/v1/user/auser`, {
        params: { userid: userId },
      });

      setUser(resp.data);
    } catch (err) {
      console.error("Error fetching user details:", err);
      // optional: handle token expiry redirect here
      // navigateTo("/login");
    }
  };

  useEffect(() => {
    gettingAUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUser,
        BASE_URL,
        gettingAUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
