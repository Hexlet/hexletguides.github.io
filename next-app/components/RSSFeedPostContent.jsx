/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { useTranslation, appWithTranslation } from 'next-i18next';

import Banner from './Banner.jsx';

const components = {
  Banner,
};

const RSSFeedPostContent = ({ href, content }) => {
  const { t } = useTranslation('post');

  return (
    <>
      <button formAction={href} data-background-color="#eee" data-color="dark" data-turbo="false" data-primary="false">
        {t('page.full_post_link')}
      </button>
      <MDXRemote compiledSource={content} components={components} />
    </>
  );
};

export default appWithTranslation(RSSFeedPostContent);
