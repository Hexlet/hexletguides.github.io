/* eslint-disable @next/next/no-img-element */
import React from 'react';

const PostPageInfo = ({ post }) => {
  const postImage = post.image ? (
    <div className="text-center mx-auto mb-5">
      <img
        className="featured-image text-center mx-auto rounded"
        src={post.image}
        alt={post.header}
      />
    </div>
  ) : null;

  return (
    <div className="row">
      <div className="col-md-10 col-lg-8 mx-auto text-break">
        <div className="mainheading">
          <h1 className="posttitle">{post.header}</h1>
        </div>
        {postImage}
        <div className="article-post">{post.content}</div>
      </div>
    </div>
  );
};

export default PostPageInfo;
