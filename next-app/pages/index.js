import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getPostsList } from '../api/index.js';
import DefaultLayout from '../components/DefaultLayout.jsx';
import HomePageInfo from '../components/HomePageInfo.jsx';

const Home = ({ posts }) => {
  return (
    <DefaultLayout>
      <HomePageInfo posts={posts} />
    </DefaultLayout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    posts: await getPostsList(locale),
    ...await serverSideTranslations(locale, ['common']),
  },
});

export default Home;
