import React, { useState, useEffect } from 'react';
import { useBankingSystem } from "../Context/UserContext.js"
import axios from "../Utills/AxiosWithJWT.js"
import { toast } from 'react-hot-toast';
import { useNavigate, NavLink } from "react-router-dom"
import NavbarDashboard from '../Dashboard/NavbarDashboard.js';
import Avatar from '../Avatar/Avatar.js';

const Profile = () => {

  const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const { BASE_URL, setUser: setUserDetails, userDetails } = useBankingSystem();
  const [existedUser, setExistedUser] = useState({
    userId: "",
    firstname: "",
    lastname: "",
    email: "",
    userdetails: {
      userdetailsid: "",
      address: "",
      city: "",
      state: "",
      pin: "",
      adhaar: "",
      pan: "",
      gender: "",
      mobile: "",
      dateOfBirth: ""
    }
  });

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) navigateTo("/");
  }, [])

  useEffect(() => {
    setExistedUser(userDetails)
  }, [userDetails])

  const handleAlreadyExistedDetails = (ele) => {
    const fieldsLevel1 = ['userId', 'firstname', 'lastname', 'email'];
    const user = ele.target.name;
    const uservalue = ele.target.value;

    if (!fieldsLevel1.includes(user?.trim())) {
      setExistedUser({
        ...existedUser,
        userdetails: {
          ...existedUser?.userdetails,
          [user]: uservalue,
        }
      });
    } else {
      setExistedUser({ ...existedUser, [user]: uservalue });
    }
  };

  const handleCreateProfile = async (event) => {
    event.preventDefault();
    const { userdetails } = existedUser;

    if (!userdetails?.adhaar || !userdetails?.pan || !userdetails?.mobile || !userdetails?.gender) {
      toast.error("Please fill all mandatory fields");
      return;
    };
    if (userdetails?.adhaar?.length !== 12) { toast.error("Aadhar must be of 12 numbers!"); return; }
    if (userdetails?.pan?.length !== 10) { toast.error("PAN must be of 10 numbers!"); return; }
    if (userdetails?.mobile?.length !== 10) { toast.error("Mobile number must be of 10 numbers!"); return; }

    const profileResp = await axios.put(`${BASE_URL}/api/v1/user/updateprofile/${existedUser.userId}`, userdetails);
    setUserDetails(profileResp.data.user);

    if (profileResp.status === 200) {
      toast.success("Profile Successfully Created! Please Relogin and request account opening!");
      sessionStorage.clear();
      navigateTo("/login")
    } else toast.error("Error in creating Profile!");
  }

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const { userdetails } = existedUser;

    if (!userdetails?.adhaar || !userdetails?.pan || !userdetails?.mobile) {
      toast.error("Please fill all mandatory fields");
      return;
    };
    if (userdetails?.adhaar?.length !== 12) { toast.error("Aadhar must be of 12 numbers!"); return; }
    if (userdetails?.pan?.length !== 10) { toast.error("PAN must be of 10 numbers!"); return; }
    if (userdetails?.mobile?.length !== 10) { toast.error("Mobile number must be of 10 numbers!"); return; }

    const profileResp = await axios.put(`${BASE_URL}/api/v1/user/updateprofile/${existedUser.userId}`, userdetails);
    setUserDetails(profileResp.data.user);

    if (profileResp.status === 200) {
      toast.success("Profile Successfully Updated! Please Relogin and request account opening!");
      sessionStorage.clear();
      navigateTo("/login")
    } else toast.error("Error in updating Profile!");
  }

  const handleSignOut = () => {
    sessionStorage.clear();
    navigateTo("/login");
    toast.success("SignOut Successful!");
  }

  // ---------------- UI ----------------
  const formFields = [
    { label: "First Name", name: "firstname", type: "text", value: existedUser?.firstname?.toUpperCase() },
    { label: "Last Name", name: "lastname", type: "text", value: existedUser?.lastname?.toUpperCase() },
    { label: "Email", name: "email", type: "email", value: existedUser?.email },
    { label: "Address", name: "address", type: "text", value: existedUser?.userdetails?.address },
    { label: "City", name: "city", type: "text", value: existedUser?.userdetails?.city },
    { label: "State", name: "state", type: "text", value: existedUser?.userdetails?.state },
    { label: "PIN Code", name: "pin", type: "text", value: existedUser?.userdetails?.pin },
    { label: "Aadhar Card Number", name: "adhaar", type: "text", value: existedUser?.userdetails?.adhaar },
    { label: "PAN Card Number", name: "pan", type: "text", value: existedUser?.userdetails?.pan?.toUpperCase() },
    { label: "Mobile Number", name: "mobile", type: "tel", value: existedUser?.userdetails?.mobile },
    { label: "Date of Birth", name: "dateOfBirth", type: "date", value: existedUser?.userdetails?.dateOfBirth }
  ];

  return (
    <>
      <nav className='navbar flex justify-between items-center h-20 bg-gradient-to-r from-purple-500 to-indigo-600 px-6'>
        <h1 className='text-white font-semibold text-lg'>Profile Section</h1>
        <div className='flex space-x-4'>
          <button onClick={handleSignOut} className='bg-white text-purple-700 py-2 px-4 rounded-lg hover:bg-gray-100'>Sign Out</button>
          <NavLink to={"/change-password"} className='bg-white text-purple-700 py-2 px-4 rounded-lg hover:bg-gray-100'>Change Password</NavLink>
        </div>
      </nav>

      <Avatar />

      <form onSubmit={!existedUser?.userdetails?.userdetailsid ? handleCreateProfile : handleUpdateProfile} className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mt-6 space-y-4">
        {formFields.map((field) => (
          <label key={field.name} className="block font-medium text-lg">
            {field.label}:
            <input
              className="bg-gray-100 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-gray-200"
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={handleAlreadyExistedDetails}
            />
          </label>
        ))}

        {/* Gender Radio */}
        <div className="block font-medium text-lg">
          Gender:
          <div className="flex space-x-4 mt-1">
            {['M', 'F', 'O'].map((g) => (
              <label key={g} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={existedUser?.userdetails?.gender === g}
                  onChange={handleAlreadyExistedDetails}
                  className="form-radio"
                />
                <span>{g === 'M' ? 'Male' : g === 'F' ? 'Female' : 'Others'}</span>
              </label>
            ))}
          </div>
        </div>

        <div className='flex justify-center mt-4'>
          <button type="submit" className='bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700'>
            {!existedUser?.userdetails?.userdetailsid ? 'Create' : 'Update'}
          </button>
        </div>
      </form>
    </>
  )
}

export default Profile;
