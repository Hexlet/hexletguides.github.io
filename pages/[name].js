import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import cfg from '../data/config.js';
import { i18n } from '../next-i18next.config.js';
import { findPost, getPublishedPosts } from '../api/index.js';
import DefaultLayout from '../components/DefaultLayout.jsx';
import PostPageInfo from '../components/PostPageInfo.jsx';

const Post = ({ post }) => {
  const { locale } = useRouter();

  if (!post) {
    return null;
  }

  const disqus = {
    short_name: cfg.disqus[locale],
    config: {
      language: locale,
      title: post.header,
      identifier: post.name,
    },
  };

  return (
    <DefaultLayout
      title={post.header}
      description={post.summary}
      author={post.author}
      image={post.image}
      type="article"
    >
      <PostPageInfo post={post} disqus={disqus} />
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
