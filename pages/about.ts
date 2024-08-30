import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';

import DefaultLayout from '../components/DefaultLayout';
import LanguageMarkup from '../components/LanguageMarkup';

interface AboutProps {
  languageMarkup: {
    awailableLocales: string[];
    defaultLocale: string;
  };
}

const About: React.FC<AboutProps> = ({ languageMarkup }) => {
  const { t } = useTranslation('about');

  return (
    <DefaultLayout title={t('page.title')} description={t('page.description')}>
      <LanguageMarkup languageMarkup={languageMarkup} />
      <div className="col-lg-8 mx-auto">
        <div className="mainheading">
          <h1 className="posttitle">{t('page.title')}</h1>
        </div>
        <div className="article-post">
          <p>{t('page.p1')}</p>
          <p dangerouslySetInnerHTML={{ __html: t('page.p2') }} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, locales, defaultLocale }) => ({
  props: {
    languageMarkup: {
      awailableLocales: locales,
      defaultLocale,
    },
    ...(await serverSideTranslations(locale, ['common', 'about'])),
  },
});

export default About;
