import DefaultLayout from '../components/DefaultLayout.jsx';
import HomePageInfo from '../components/HomePageInfo.jsx';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getConfig } from '../api/index.js';

const Home = () => (
  <DefaultLayout>
    <HomePageInfo />
  </DefaultLayout>
);

export const getStaticProps = async ({ locale }) => ({
  props: {
    config: await getConfig(),
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Home;
