import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar fixed top */}
      <Navbar />

      {/* Main content grows */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer always bottom */}
      <Footer />
    </div>
  );
};

export default Root;
