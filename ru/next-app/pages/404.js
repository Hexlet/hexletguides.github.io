import Link from 'next/link'
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function FourOhFour() {
  const { t } = useTranslation('404');

  return (
    <>
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
                    <a className=""><ins>{t('page.link')}</ins></a>
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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['404']),
  },
});
