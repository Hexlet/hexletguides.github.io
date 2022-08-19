import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { i18n } from '../next-i18next.config.js';
import { findPost, getConfig, getPublishedPosts } from '../api/index.js';
import DefaultLayout from '../components/DefaultLayout.jsx';
import PostPageInfo from '../components/PostPageInfo.jsx';

const Post = ({ post }) => {
  if (!post) {
    return null;
  }

  return (
    <DefaultLayout>
      <PostPageInfo post={post} />
    </DefaultLayout>
  );
};

export const getStaticProps = async ({ locale, params }) => {
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

  return {
    props: {
      post,
      config: await getConfig(),
      ...await serverSideTranslations(locale, ['common']),
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
