import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const DefaultLayout = ({ children }) => (
    <>
      <Navbar/>
      <main className="container">{children}</main>
      <Footer />
    </>
  );
  
export default DefaultLayout;
