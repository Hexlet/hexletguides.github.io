// @ts-check
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import cfg from '../data/config.js';

const LanguageMarkup = ({ languageMarkup }) => {
  const { awailableLocales, defaultLocale } = languageMarkup;
  const { asPath } = useRouter();
  const [path] = asPath.split('?');
  if (!awailableLocales) {
    return null;
  };
  return (
    <Head>
      {awailableLocales.map((loc) => {
        const prefix = loc === 'en' ? '' : `/${loc}`;
        const url = `${cfg.siteUrl}${prefix}${path}`;
        return (loc === defaultLocale )
          ? (<link key={loc} rel="alternate" hrefLang="x-default" href={url} />)
          : (<link key={loc} rel="alternate" hrefLang={loc} href={url} />)
        })}
    </Head>
  );
};

export default LanguageMarkup;
