import DefaultLayout from '../components/DefaultLayout.jsx';
import HomePageInfo from '../components/HomePageInfo.jsx';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home = () => (
  <DefaultLayout>
    <HomePageInfo />
  </DefaultLayout>
);

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Home;
