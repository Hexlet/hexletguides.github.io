import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import cfg from '../data/config.js';
import { i18n } from '../next-i18next.config.js';
import { findPost, getPublishedPosts, getPostAwailableLocales } from '../api/index.js';
import DefaultLayout from '../components/DefaultLayout.jsx';
import PostPageInfo from '../components/PostPageInfo.jsx';
import MicrometricArticles from '../components/MicrometricArticles.jsx';
import LanguageMarkup from '../components/LanguageMarkup.jsx';

const Post = ({ post, languageMarkup }) => {
  const { locale } = useRouter();

  if (!post) {
    return null;
  }

  return (
    <DefaultLayout
      title={post.title}
      description={post.summary}
      author={post.author}
      image={post.image}
      type="article"
    >
      <LanguageMarkup languageMarkup={languageMarkup} />
      <MicrometricArticles post={post} />
      <PostPageInfo post={post} />
    </DefaultLayout>
  );
};

export const getStaticProps = async ({ locales, locale, params, defaultLocale }) => {
  const post = await findPost(params.name, locale);

  if (!post) {
    return {
      notFound: true,
    };
  }

  if (post.redirect_to) {
    return {
      redirect: {
        permanent: true,
        destination: post.redirect_to,
      },
    };
  }

  const awailableLocales = await getPostAwailableLocales(params.name, locale, locales);

  return {
    props: {
      languageMarkup: { awailableLocales, defaultLocale },
      post,
      ...(await serverSideTranslations(locale, ['common', 'post'])),
    },
  };
};

export const getStaticPaths = async () => {
  const promises = i18n.locales.map(async (locale) => {
    const posts = await getPublishedPosts(locale);

    return posts
      .filter(({ redirect_to }) => !redirect_to)
      .map(({ name }) => ({
        locale,
        params: { name },
      }));
  });

  const allPaths = await Promise.all(promises);
  const paths = allPaths.flat();

  return {
    paths,
    fallback: true,
  };
};

export default Post;
