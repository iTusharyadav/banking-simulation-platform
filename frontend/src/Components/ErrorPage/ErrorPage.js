import React from 'react'
import { NavLink } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl flex flex-col md:flex-row items-center justify-center w-full max-w-4xl">
        
        {/* Illustration */}
        <div className="md:w-1/2 flex justify-center p-6">
          <img
            className="hidden md:block w-80"
            src="https://i.ibb.co/9Vs73RF/undraw-page-not-found-su7k-1-3.png"
            alt="Page Not Found Illustration"
          />
          <img
            className="md:hidden w-64"
            src="https://i.ibb.co/RgYQvV7/undraw-page-not-found-su7k-1.png"
            alt="Page Not Found Illustration"
          />
        </div>

        {/* Text content */}
        <div className="md:w-1/2 flex flex-col items-center p-6 text-center">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-4">OOPS!</h1>
          <p className="text-gray-600 mb-8">
            No signal here! We cannot find the page you are looking for.
          </p>
          <NavLink to={"/"}>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              Go Back Home
            </button>
          </NavLink>
        </div>

      </div>
    </div>
  )
}

export default ErrorPage
