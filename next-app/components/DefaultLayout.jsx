import React from 'react';
import Head from 'next/head';

import config from '../data/config.js';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const DefaultLayout = ({ title, children }) => {
  const fullTitle = title ? `${title} | ${config.title}` : config.title;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <link rel="icon" href={config.favicon}></link>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
      </Head>
      <Navbar />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
