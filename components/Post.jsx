/* TODO: remove ignore linter rule */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

const Post = ({ post }) => (
  <div className="card">
    <div className="card-block">
      <div className="card-title h4 serif-font">
        <Link key={post.name} href={post.href}>
          {post.header}
        </Link>
        <picture>
          {
            post.image ?
              <img className="featured-image text-center mx-auto rounded" src={post.image} alt={post.title} /> :
              <img className="featured-image text-center mx-auto rounded" src="/assets/images/dummy.jpg" alt={post.title} />
          }
        </picture>
      </div>
      <p className="card-text text-muted">{post.summary}</p>
    </div>
  </div>
);

export default Post;
