import React from 'react';
import bankpic from "../../assets/images/banking-hero.jpg";
import { BsArrowRight } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

const LandingHero = () => {
  return (
    <section className="text-gray-800 body-font bg-gradient-to-r from-indigo-50 to-indigo-100">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-6 font-bold text-indigo-900">
            Browse All New Banking Smoothly
          </h1>
          <p className="mb-8 leading-relaxed text-indigo-700">
            Free easy money management, easy transfers, and quick account opening.
          </p>
          <NavLink to={"/signup"}>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Get Started <BsArrowRight className='text-lg'/>
            </button>
          </NavLink>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded shadow-lg" alt="Banking hero" src={bankpic}/>
        </div>
      </div>
    </section>
  )
}

export default LandingHero;
