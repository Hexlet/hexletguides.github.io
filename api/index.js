import path from 'path';
import fsp from 'fs/promises';

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeSlug from 'rehype-slug';
import { serialize } from 'next-mdx-remote/serialize';
import Feed from 'turbo-rss';
import findLastIndex from 'lodash.findlastindex';
import capitalize from 'lodash.capitalize';
import { parseISO, endOfDay } from 'date-fns';

import RSSFeedPostContent from '../components/RSSFeedPostContent.jsx';
import { i18n } from '../next-i18next.config.js';
import cfg from '../data/config.js';

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
  return name.split('-').map(capitalize).join(' ');
};

const readPost = async (filePath, basePath, locale) => {
  const fileContent = await fsp.readFile(path.join(basePath, filePath), 'utf-8');
  const matches = getMatches(fileContent);
  const contentWithLinks = addLinksToContent(matches, fileContent);
  const { data, content } = matter(contentWithLinks);
  const { name } = path.parse(filePath);
  const { title = null, header = title, description = null, summary = description, ...props } = data;
  const sourceUrl = `${cfg.repositoryUrl}/tree/main/${filePath}`;
  const shortName = name.slice(11); // remove DD_MM_YYYY prefix from post file name

  const date = endOfDay(parseISO(name.slice(0, 10)));

  // make date UTC
  date.setUTCHours(0, 0, 0, 0);

  return {
    title,
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
      rehypePlugins: [rehypePrism, rehypeSlug],
      remarkPlugins: [remarkGfm],
      format: 'mdx',
    },
    parseFrontmatter: false,
  });
  return compiledSource;
};

const makePostRSSItem = async (post, locale) => {
  const postUrl = new URL(post.href, cfg.siteURL);
  const content = await compilePostContent(post.content);
  const breadcrumbs = [
    {
      link: cfg.siteURL,
      text: cfg.title,
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
    title: post.title,
    header: post.header,
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
  const dir = process.cwd();
  const postsPath = path.join('data', 'posts', locale);
  const entries = await fsp.readdir(path.join(dir, postsPath), { withFileTypes: true });
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

  return posts.filter(({ hidden = false }) => !hidden).reverse();
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
  const promises = posts.filter(({ hidden = false }) => !hidden).map((post) => makePostRSSItem(post, locale));

  const feedItems = await Promise.all(promises);
  const feed = new Feed({
    title: cfg.title,
    link: cfg.siteURL,
    description: cfg.description,
    language: locale,
  });

  feedItems.forEach((data) => feed.item(data));

  return feed.xml();
};

export const generateSitemap = async (locale) => {
  const posts = await getPublishedPosts(locale);
  const visiblePosts = posts.filter(({ hidden = false }) => !hidden);
  const fields = visiblePosts.map((post) => ({
    loc: new URL(path.join(post.href, '/'), cfg.siteURL),
    lastmod: post.date,
    "image:image": `<image:loc>${new URL(post.image, cfg.siteURL)}</image:loc>`,
  }));

  fields.push({
    loc: new URL(makeHref(null, locale), cfg.siteURL),
  });

  fields.push({
    loc: new URL(makeHref('about', locale), cfg.siteURL),
  });

  return fields;
};

const getMatches = (content) => {
  const h2Regex = /^## (.*$)/gim;
  const ignoreRegex = /`{3}([\w]*)\n([\S\s]+?)\n`{3}/gim
  const contentWithoutMLComments = content.replace(/{\/\*[\s\S]*?\*\/}/gm, '');
  const contentWithoutMarkdown = contentWithoutMLComments.replace(ignoreRegex, '');
  const matches = contentWithoutMarkdown.match(h2Regex);
  if (matches) {
    return matches;
  }
  return null;
};

const addLinksToContent = (matches, content) => {
  if (matches) {
    const firstHeading = matches[0];

    const text = matches.map((elem) => {
      const length = elem.length;
      return elem.slice(3, length);
    });

    const links = text.map((elem) => {
      const normilizedLink = elem
        .replace(/[^0-9a-zа-я -]/gim, '')
        .split(' ')
        .join('-')
        .toLowerCase();
      return `- [${elem}](#${normilizedLink})`;
    });

    const string = [...links, firstHeading].join('\n');
    const newContent = content.replace(firstHeading, string);
    return newContent;
  }
  return content;
};

export const getPostAwailableLocales = async (name, locale, locales) => {
  /// Getting posts from another locales
   const promises = locales
    .filter((l) => l !== locale)
    .map(async (loc) => ({ loc, posts : await getPublishedPosts(loc) }));
  const anotherPosts = await Promise.all(promises);
  /// Searching for translated posts to original post
  const awailableLocales = anotherPosts
    .filter(({ posts }) => findLastIndex(posts, (post) => post.name === name) !== -1)
    .map(({ loc }) => loc);

  if (awailableLocales.length === 0) {
    return null;
  };

  return [locale, ...awailableLocales];
};
