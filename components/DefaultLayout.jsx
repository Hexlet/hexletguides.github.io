import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import cfg from '../data/config.js';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const DefaultLayout = ({ title, description, author, image, type = 'website', children }) => {
  const { t } = useTranslation('common');
  const { asPath, locale } = useRouter();
  const fullTitle = title ? `${title} | ${cfg.title}` : cfg.title;
  const metaDescription = description || t('description');
  const metaAuthor = author || t('author');
  const [path] = asPath.split('?');
  const prefix = locale === 'ru' ? `/${locale}` : '';
  const url = `${cfg.siteUrl}${prefix}${path}`;
  const imageUrl = `${cfg.siteUrl}${image}`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <link rel="icon" href={cfg.favicon} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="author" content={metaAuthor} />
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:locale" content={t('locale')} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={cfg.title} />
        <meta property="og:type" content={type} />
        {image && <meta property="og:image" content={imageUrl} />}
        <meta property="twitter:title" content={title} />
        <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
        {image && <meta name="twitter:image" content={imageUrl} />}
      </Head>
      <Navbar />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
