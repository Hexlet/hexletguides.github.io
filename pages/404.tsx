import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LanguageMarkup from '../components/LanguageMarkup';
import { GetStaticProps } from 'next';
import React from 'react';

interface FourOhFourProps {
  languageMarkup: {
    awailableLocales: string[];
    defaultLocale: string;
  };
}

const FourOhFour: React.FC<FourOhFourProps> = ({ languageMarkup }) => {
  const { t } = useTranslation('404');

  return (
    <>
      <LanguageMarkup languageMarkup={languageMarkup} />
      <div className="container vh-100">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="d-flex">
            <div className="d-flex align-items-center flex-shrink-0 me-3">
              <Image width="32" height="32" alt="Hexlet logo" src="/images/hexlet_logo.png" />
            </div>
            <div className="vr"></div>
            <div className="ms-3">
              <div className="lead">404 - {t('page.message')}</div>
              <div>
                <small>
                  {t('page.linkPrefix')}
                  {' '}
                  <Link href="/">
                    <a className="">
                      <ins>{t('page.link')}</ins>
                    </a>
                  </Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, locales, defaultLocale }) => ({
  props: {
    languageMarkup: {
      awailableLocales: locales,
      defaultLocale,
    },
    ...await serverSideTranslations(locale, ['404']),
  },
});

export default FourOhFour;