import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getPostsList } from '../api/index.js';
import DefaultLayout from '../components/DefaultLayout.jsx';
import HomePageInfo from '../components/HomePageInfo.jsx';

const Home = ({ posts }) => {
  const { t } = useTranslation('common');

  return (
    <DefaultLayout title={t('title')}>
      <HomePageInfo posts={posts} />
    </DefaultLayout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    posts: await getPostsList(locale),
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
