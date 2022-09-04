import { withXMLResponse } from 'next-sitemap';

import { generateRssFeed } from '../../api/index.js';

export const getServerSideProps = async (ctx) => {
  const feed = await generateRssFeed(ctx.locale);

  return withXMLResponse(ctx, feed);
};

export default function RSSFeed() {}
