import React from 'react';
import Link from 'next/link';

import banners from '../data/banners.js';

const Banner = ({ name }) => {
  const banner = banners[name];

  if (!banner) {
    return null;
  }

  const bannerUrl = new URL(banner.link);

  bannerUrl.searchParams.set('utm_source', 'hexlet-guides');
  bannerUrl.searchParams.set('utm_medium', 'banner');
  bannerUrl.searchParams.set('utm_campaign', name);


  return (
    <div className="fs-3 border-start p-4 mb-3 bg-light border-info border-3 banner">
      <Link href={bannerUrl.toString()}>
        <a target="_blank">{banner.content}</a>
      </Link>
    </div>
  );
};

export default Banner;
