import React from "react";
// import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language === 'en' ? 'ru' : 'en';
  const lngButton = i18n.language === 'en' ? 'Ru' : 'En';
  const changeLanguage = () => {
    i18n.changeLanguage(lng);
  }
  return (
    <div className="container mb-4">
    <div className="d-flex flex-wrap justify-content-center py-3">
      <Link href="/">
        <a className="navbar-brand me-auto">
          <img width="30" alt="Hexlet logo" src="/images/hexlet_logo.png" />
        </a>
      </Link>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link href="https://github.com/Hexlet/hexletguides.github.io">
            <a className="nav-link">
              {t('menu.source_code')}
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href={t('links.programs_list.url')}>
            <a className="nav-link">
              {t('links.programs_list.name')}
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link" onClick={changeLanguage}>{lngButton}</a>
          </Link>
        </li>
      </ul>
    </div>
  </div>
  )
};

export default Navbar;
