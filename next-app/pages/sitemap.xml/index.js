import { getServerSideSitemap } from 'next-sitemap';

import { generateSitemap } from '../../api/index.js';

export const getServerSideProps = async (ctx) => {
  const feed = await generateSitemap(ctx.locale);

  return getServerSideSitemap(ctx, feed);
};

export default function Sitemap() {}
