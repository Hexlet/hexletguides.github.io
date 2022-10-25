import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import cfg from '../data/config.js';

const Navbar = () => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  const langSwitchLink =
    locale === 'en' ? (
      <Link href="/" locale="ru">
        <a className="nav-link text-capitalize">ru</a>
      </Link>
    ) : (
      <Link href="/" locale={false}>
        <a className="nav-link text-capitalize">en</a>
      </Link>
    );

  return (
    <div className="container mb-4">
      <div className="d-flex flex-wrap justify-content-center py-3">
        <Link href="/">
          <a className="navbar-brand me-auto">
            <Image width="30" height="30" alt="Hexlet logo" src={cfg.logo} />
          </a>
        </Link>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link href={cfg.repositoryUrl}>
              <a className="nav-link" target="_blank">
                {t('navbar.source_code.title')}
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href={t('navbar.programs.url')}>
              <a className="nav-link" target="_blank">
                {t('navbar.programs.title')}
              </a>
            </Link>
          </li>
          <li className="nav-item">{langSwitchLink}</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
