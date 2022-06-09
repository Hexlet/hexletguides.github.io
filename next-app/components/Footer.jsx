import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  i18n.language
  return (
    <footer className="footer container text-center">
      <ul className="p-0 mb-1 small">
        <li>
          <a href={t('footermenu.0.url')} alt={t('footermenu.0.title')}>{t('footermenu.0.title')}</a>
        </li>
        <li>
          <a href={t('footermenu.1.url')} alt={t('footermenu.1.title')}>{t('footermenu.1.title')}</a>
        </li>
        <li>
          <a href={t('footermenu.2.url')} alt={t('footermenu.2.title')}>{t('footermenu.2.title')}</a>
        </li>
        {
          i18n.language === 'ru' ? (
            <li>
              <a href={t('footermenu.3.url')} alt={t('footermenu.3.title')}>{t('footermenu.3.title')}</a>
            </li>
          ) : null
        }
      </ul>
    </footer>
  );
};

export default Footer;
