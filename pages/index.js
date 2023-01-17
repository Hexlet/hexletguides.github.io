import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Script from 'next/script';

import { getPostsList } from '../api/index.js';
import DefaultLayout from '../components/DefaultLayout.jsx';
import HomePageInfo from '../components/HomePageInfo.jsx';
import LanguageMarkup from '../components/LanguageMarkup.jsx';

const GTM = () => {
  return (
    <>
      <Script id="gdm" src="/assets/js/couters.js" />
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KMJ8HKG"
height="0" width="0" style={{display: 'none', visibility: 'hidden' }}></iframe></noscript>
    </>
  )
};

const Home = ({ posts, languageMarkup }) => {
  const { t } = useTranslation('common');

  return (
    <DefaultLayout title={t('title')}>
      {process.env.NODE_ENV === 'production' ? <GTM /> : null}
      <LanguageMarkup languageMarkup={languageMarkup} />
      <HomePageInfo posts={posts} />
    </DefaultLayout>
  );
};

export const getStaticProps = async ({ locale, locales, defaultLocale }) => ({
  props: {
    languageMarkup: {
      awailableLocales: locales,
      defaultLocale,
    },
    posts: await getPostsList(locale),
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
