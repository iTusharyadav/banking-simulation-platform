import React from 'react';
import Navbar from './Navbar';
import LandingHero from './LandingHero';
import LandingFooter from './LandingFooter';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <LandingHero />
      </main>
      <LandingFooter />
    </div>
  );
}

export default LandingPage;
