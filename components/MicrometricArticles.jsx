import React from 'react';

import cfg from '../data/config.js';

const makeConfig = ({ author, header = '', date = '', image = '', author_url = '' }) => {
  if (!author) return null;
  const articleImage = image ? `${cfg.siteUrl}${image}` : '';
  const result = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": header,
    "image": articleImage,
    "datePublished": date,
    "author": {
      "@type": "Person",
      "name": author,
      "url": author_url,
    },
  }
  return result;
};

const MicrometricArticles = ({ post }) => {
  const config = makeConfig(post);
  return config && (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(makeConfig(post)),
        }}
    />
  );
}

export default MicrometricArticles;
