import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { i18n } from '../next-i18next.config.js';
import { findPost, getConfig, getPostsList } from '../api/index.js';
import DefaultLayout from '../components/DefaultLayout.jsx';
import PostPageInfo from '../components/PostPageInfo.jsx';

const Post = ({ post }) => {
  return (
    <DefaultLayout>
      <PostPageInfo post={post} />
    </DefaultLayout>
  );
};

export const getStaticProps = async ({ locale, params }) => ({
  props: {
    config: await getConfig(),
    post: await findPost(params.name, locale),
    ...await serverSideTranslations(locale, ['common']),
  },
});

export const getStaticPaths = async () => {
    const promises = i18n.locales.map(async (locale) => {
        const posts = await getPostsList(locale);

        return posts.map(({ name }) => ({
            locale,
            params: { name },
        }));
    });

    const allPaths = await Promise.all(promises);
    const paths = allPaths.flat();

    return {
        paths,
        fallback: false,
    };
};

export default Post;
