/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { useTranslation } from 'next-i18next';

import Banner from './Banner.jsx';

const components = {
  Banner,
  img: ({ src }) => <amp-img src={src} layout="responsive" height="0.6" width="1" />,
};

const AmpPostPageInfo = ({ post }) => {
  const href = {
    pathname: '/[name]',
    query: {
      name: post.name,
    },
  };

  const { t } = useTranslation('post');

  return (
    <>
      <h1>{post.header}</h1>
      <Link href={href}>
        <a className="full_post_link">{t('page.full_post_link')} →</a>
      </Link>
      <MDXRemote compiledSource={post.content} components={components} />
    </>
  );
};

export default AmpPostPageInfo;
