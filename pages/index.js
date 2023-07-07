import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getPostsList } from '../api/index.js';
import DefaultLayout from '../components/DefaultLayout.jsx';
import HomePageInfo from '../components/HomePageInfo.jsx';
import LanguageMarkup from '../components/LanguageMarkup.jsx';

const Home = ({ posts, languageMarkup }) => {
  const { t } = useTranslation('common');

  return (
    <DefaultLayout title={t('title')}>
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
