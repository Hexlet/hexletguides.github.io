/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { useTranslation } from 'next-i18next';

import Author from './Author.jsx';
import Disqus from './Disqus.jsx';
import Banner from './Banner.jsx';
import PostPageNav from './PostPageNav.jsx';

const components = {
  Banner,
};

const PostPageInfo = ({ post, disqus }) => {
  const { t } = useTranslation('post');

  const postImage = post.image ? (
    <div className="text-center mx-auto mb-5">
      <img className="featured-image text-center mx-auto rounded" src={post.image} alt={post.header} />
    </div>
  ) : null;
  return (
    <div className="row">
      <div className="col-md-10 col-lg-8 mx-auto text-break">
        <div className="mainheading">
          <h1 className="posttitle">{post.header}</h1>
        </div>
        {postImage}
        <div className="article-post">
          <MDXRemote compiledSource={post.content} components={components} />
        </div>
        <PostPageNav nextPost={post.nextPostData} prevPost={post.prevPostData}/>
        <div className="lead d-flex my-5">
          <span className="me-auto">
            <Link href={post.sourceUrl}>
              <a alt={t('page.source_code')} target="_blank">
                {t('page.source_code')}
              </a>
            </Link>
          </span>
          <Author name={post.author} url={post.author_url} />
        </div>
        <section>
          <div id="comments">
            <Disqus shortName={disqus.short_name} config={disqus.config} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostPageInfo;
