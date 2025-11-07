import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

const NavbarDashboard = () => {
    const navigateTo = useNavigate();

    const handleSignOut = () => {
        sessionStorage.clear();
        navigateTo("/login");
        toast.success("Sign Out Successful!");
    }

    return (
        <nav className='flex flex-row justify-between items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-md'>
            <div>
                <h1 className='text-3xl font-bold text-white'>Welcome</h1>
            </div>
            <div className='flex flex-row items-center space-x-4'>
                <NavLink to={"/profile"} className='bg-white text-indigo-600 py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition'>Profile Update</NavLink>
                <button onClick={handleSignOut} className='bg-white text-indigo-600 py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition'>Sign Out</button>
            </div>
        </nav>
    )
}

export default NavbarDashboard
