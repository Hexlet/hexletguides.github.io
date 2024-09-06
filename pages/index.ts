import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

import { getPostsList } from '../api/index';
import HomePageInfo from '../components/HomePageInfo';

interface LanguageMarkupProps {
  awailableLocales: string[];
  defaultLocale: string;
}

interface HomeProps {
  posts: any[]; // Replace 'any' with the actual type of your posts
  languageMarkup: LanguageMarkupProps;
}

const Home: React.FC<HomeProps> = ({ posts, languageMarkup }) => {
  const { t } = useTranslation('common');

  return (
    <DefaultLayout title={t('title')}>
    <LanguageMarkup languageMarkup={languageMarkup} />
    <HomePageInfo posts={posts} />
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, locales, defaultLocale }) => ({
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