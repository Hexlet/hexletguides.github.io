import path from 'path';
import fsp from 'fs/promises';

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypePrism from '@mapbox/rehype-prism';
import { serialize } from 'next-mdx-remote/serialize';
import Feed from 'turbo-rss';
import findLastIndex from 'lodash.findlastindex';
import capitalize from 'lodash.capitalize';
import { parseISO, endOfDay } from 'date-fns';

import RSSFeedPostContent from '../components/RSSFeedPostContent.jsx';
import { i18n } from '../next-i18next.config.js';
import config from '../data/config.js';

const makeHref = (pathname, locale) => {
  const parts = ['/'];

  if (locale !== i18n.defaultLocale) {
    parts.push(locale);
  }

  if (pathname) {
    parts.push(pathname);
  }

  return path.join(...parts);
};

const formatNameToHeader = (name) => {
  return name
    .split('-')
    .map(capitalize)
    .join(' ');
};

const readPost = async (filePath, basePath, locale) => {
  const fileContent = await fsp.readFile(path.join(basePath, filePath), 'utf-8');
  const { data, content } = matter(fileContent);
  const { name } = path.parse(filePath);
  const { title = null, header = title, description = null, summary = description, ...props } = data;
  const sourceUrl = `${config.repositoryUrl}/tree/main/${filePath}`;
  const shortName = name.slice(11); // remove DD_MM_YYYY prefix from post file name
  const date = endOfDay(parseISO(name.slice(0, 10)));

  // make date UTC
  date.setUTCHours(0, 0, 0, 0);

  return {
    summary,
    content,
    sourceUrl,
    name: shortName,
    header: header || formatNameToHeader(shortName),
    date: date.toISOString(),
    href: makeHref(shortName, locale),
    ...props,
  };
};

const compilePostContent = async (content) => {
  const { compiledSource } = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypePrism],
      remarkPlugins: [remarkGfm],
      format: 'mdx',
    },
    parseFrontmatter: false,
  });

  return compiledSource;
};

const makePostRSSItem = async (post, locale) => {
  const postUrl = new URL(post.href, config.siteURL)
  const content = await compilePostContent(post.content);
  const breadcrumbs = [
    {
      link: config.siteURL,
      text: config.title,
    },
    {
      link: postUrl.toString(),
      text: post.header,
    },
  ];

  const translations = await serverSideTranslations(locale, ['common', 'post']);
  const contentElement = createElement(RSSFeedPostContent, {
    pageProps: {
      ...translations,
    },
    content,
    href: postUrl.toString(),
  });

  return {
    title: post.header,
    author: post.author,
    content: renderToString(contentElement),
    link: postUrl.toString(),
    date: post.date,
    breadcrumbs,
    extendedHtml: true,
    turboEnabled: true,
  };
};

export const getPublishedPosts = async (locale) => {
  const { dir } = path.parse(process.cwd());
  const postsPath = path.join('next-app', 'data', 'posts', locale);
  const entries = await fsp.readdir(path.resolve(dir, postsPath), { withFileTypes: true });
  const fileNames = entries
    .filter((entry) => entry.isFile())
    .filter(({ name }) => path.extname(name) === '.md')
    .map(({ name }) => name);

  const promises = fileNames
    .sort((a, b) => a.localeCompare(b))
    .map(async (name) => readPost(path.join(postsPath, name), dir, locale));

  return await Promise.all(promises);
};

export const getPostsList = async (locale) => {
  const posts = await getPublishedPosts(locale);

  return posts
    .filter(({ hidden = false }) => !hidden)
    .map(({ header, summary, name, href }) => ({
      header,
      summary,
      name,
      href,
    }))
    .reverse();
};

export const findPost = async (name, locale) => {
  const posts = await getPublishedPosts(locale);
  const postIndex = findLastIndex(posts, (post) => post.name === name);

  if (postIndex === -1) {
    return null;
  }

  const postsCount = posts.length - 1;
  const nextPost = postIndex === postsCount ? posts[0] : posts[postIndex + 1];
  const prevPost = postIndex === 0 ? posts[postsCount] : posts[postIndex - 1];

  const { content, ...props } = posts[postIndex];

  return {
    ...props,
    nextPostData: { name: nextPost.name, header: nextPost.header, href: nextPost.href },
    prevPostData: { name: prevPost.name, header: prevPost.header, href: prevPost.href },
    content: await compilePostContent(content),
  };
};

export const generateRssFeed = async (locale) => {
  const posts = await getPublishedPosts(locale);
  const promises = posts
    .filter(({ hidden = false }) => !hidden)
    .map((post) => makePostRSSItem(post, locale));

  const feedItems = await Promise.all(promises);
  const feed = new Feed({
    title: config.title,
    link: config.siteURL,
    description: config.description,
    language: locale,
  });

  feedItems.forEach((data) => feed.item(data));

  return feed.xml();
};

export const generateSitemap = async (locale) => {
  const posts = await getPublishedPosts(locale);
  const visiblePosts = posts.filter(({ hidden = false }) => !hidden);
  const fields = visiblePosts.map((post) => ({
    loc: new URL(post.href, config.siteURL),
    lastmod: post.date,
  }));

  fields.push({
    loc: new URL(makeHref(null, locale), config.siteURL)
  });

  fields.push({
    loc: new URL(makeHref('about', locale), config.siteURL)
  });

  return fields;
};
