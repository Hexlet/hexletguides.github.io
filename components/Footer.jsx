import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation('common');
  const getYear = () => {
    const year = new Date().getFullYear();
    return year;
  }

  return (
    <footer className="footer container text-center">
      <ul className="p-0 mb-1 small">
        <li>
          <span className="me-1">&copy;</span>
          <Link href={t('footer.hexlet.url')}>
            <a alt={t('footer.hexlet.title')} target="_blank">
              {t('footer.hexlet.title')}
            </a>
          </Link>,
          <span className="ms-1">{getYear()}</span>
        </li>
        <li>
          <Link href="/about">
            <a alt={t('footer.about.title')}>{t('footer.about.title')}</a>
          </Link>
        </li>
        <li>
          <Link href={t('footer.webinars.url')}>
            <a alt={t('footer.webinars.title')} target="_blank">
              {t('footer.webinars.title')}
            </a>
          </Link>
        </li>
        {i18n.language === 'ru' ? (
          <li>
            <Link href={t('footer.cv.url')}>
              <a alt={t('footer.cv.title')} target="_blank">
                {t('footer.cv.title')}
              </a>
            </Link>
          </li>
        ) : null}
        <li>
          <Link href={t('footer.codebattle.url')}>
            <a alt={t('footer.codebattle.title')} target="_blank">
              {t('footer.codebattle.title')}
            </a>
          </Link>
        </li>
        <li>
          <Link href={t('footer.policy.url')}>
            <a alt={t('footer.policy.title')} target="_blank">
              {t('footer.policy.title')}
            </a>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
