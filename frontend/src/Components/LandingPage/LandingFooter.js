import React from 'react';
import { BsBank } from "react-icons/bs";
import logo from "../../assets/images/yolo.jpeg"; // keep logo only, no personal images

const LandingFooter = () => {
  return (
    <footer className="text-gray-700 body-font bg-gray-50 border-t">
      <div className="container px-5 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-bold items-center md:justify-start justify-center text-gray-900">
            <BsBank className='text-3xl text-indigo-600'/>
            <span className="ml-3 text-2xl">Online Banking System</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">Secure and easy money transfers</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {["Services", "Support", "Company", "Legal"].map((title, idx) => (
            <div key={idx} className="lg:w-1/4 md:w-1/2 w-full px-4 mb-4">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-sm mb-3">{title.toUpperCase()}</h2>
              <nav className="list-none">
                {["Link One", "Link Two", "Link Three", "Link Four"].map((link, i) => (
                  <li key={i}>
                    <a className="text-gray-600 hover:text-indigo-600">{link}</a>
                  </li>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm text-center sm:text-left">© 2025 Online Banking System — All Rights Reserved</p>
          <span className="inline-flex mt-2 sm:mt-0 justify-center sm:justify-start space-x-3">
            {["#","#","#","#"].map((_, i) => (
              <a key={i} className="text-gray-500 hover:text-indigo-600">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter;
