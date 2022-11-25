import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Post from './Post.jsx';

const AuthorPage = ({ author, avatar, description, posts }) => {
  const { t } = useTranslation('author');
  
  const postsList = posts.filter((post) => post.author === author).map((post) =>
    <div key={post.name} className="mb-4">
      <Post post={post} />
    </div>
    );

  return (
    <div className="row mx-lg-5">
        <div className="col-md-4 mb-5">
            <div className="card">
                <div className="card-block">
                    <Image
                      className="rounded-circle"
                      src={avatar}
                      alt="avatar"
                      width={300}
                      height={300}
                    />
                    <h2>{author}</h2>
                    <p className="card-text text-muted">
                      {description}
                    </p>
                </div>
            </div>
        </div>
        <div className="col-md-8">
            <h2>{t('publications')}</h2>
            <hr/>
            {postsList}
        </div>
    </div>
  );
};

export default AuthorPage;
