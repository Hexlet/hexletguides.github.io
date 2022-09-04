import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Post from './Post.jsx';

const HomePageInfo = ({ posts }) => {
  const { t } = useTranslation('common');

  const postsList = posts.map(({ header, summary, name, href }) => (
    <div key={name} className="col-md-6 mb-5">
      <Post name={name} header={header} summary={summary} href={href} />
    </div>
  ));

  return (
    <>
      <div className="rounded hero p-4 p-lg-5 mb-5">
        <div className="row mx-lg-5">
          <div className="col-md-8">
            <h1 className="display-5 fw-bold">{t('hero.header')}</h1>
            <p className="lead">{t('hero.description')}</p>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <Image className="intro" width="344" height="274" src="/images/intro.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="row mx-lg-5">{postsList}</div>
    </>
  );
};

export default HomePageInfo;
