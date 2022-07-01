import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Navbar = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const lngButton = router.locale === 'en' ? 'Ru' : 'En';
  const handleChangeLanguage = (e) => {
    e.preventDefault();
    const currentLocation = router.pathname;
    router.push(currentLocation, currentLocation, { locale: lngButton.toLowerCase() });
  }
  return (
    <div className="container mb-4">
    <div className="d-flex flex-wrap justify-content-center py-3">
      <Link href="/">
        <a className="navbar-brand me-auto">
          <Image width="30" height="30" alt="Hexlet logo" src="/images/hexlet_logo.png" />
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
            <a className="nav-link" onClick={handleChangeLanguage}>{lngButton}</a>
          </Link>
        </li>
      </ul>
    </div>
  </div>
  )
};

export default Navbar;
