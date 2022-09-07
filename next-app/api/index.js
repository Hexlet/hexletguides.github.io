import path from 'path';
import fsp from 'fs/promises';
import fs from 'fs';

import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypePrism from '@mapbox/rehype-prism';
import { serialize } from 'next-mdx-remote/serialize';
import { Feed } from 'feed';
import findLastIndex from 'lodash.findlastindex';
import capitalize from 'lodash.capitalize';

import config from '../data/config.js';

const formatNameToHeader = (name) => {
  return name
    .split('-')
    .map(capitalize)
    .join(' ');
};

const readPost = async (filePath, basePath) => {
  const fileContent = await fsp.readFile(path.join(basePath, filePath), 'utf-8');
  const { data, content } = matter(fileContent);
  const { name } = path.parse(filePath);
  const { title = null, header = title, description = null, summary = description, ...props } = data;
  const sourceUrl = `${config.repositoryUrl}/tree/main/${filePath}`;
  const shortName = name.slice(11);  // remove DD_MM_YYYY prefix from post file name

  return {
    summary,
    content,
    sourceUrl,
    name: shortName,
    header: header || formatNameToHeader(shortName),
    ...props,
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
    .map(async (name) => readPost(path.join(postsPath, name), dir));

  return await Promise.all(promises);
};

export const getPostsList = async (locale) => {
  const posts = await getPublishedPosts(locale);

  return posts
    .filter(({ hidden = false }) => !hidden)
    .map(({ header, summary, name }) => ({
      header,
      summary,
      name,
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
  const { compiledSource } = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypePrism],
      remarkPlugins: [remarkGfm],
      format: 'mdx',
    },
    parseFrontmatter: false,
  });

  return {
    ...props,
    nextPostData: { name: nextPost.name, header: nextPost.header },
    prevPostData: { name: prevPost.name, header: prevPost.header },
    content: compiledSource,
  };
};

export const generateRssFeed = async (locale) => {
  const posts = await getPublishedPosts(locale);
  const postsToShow = posts.filter(({ hidden = false }) => !hidden);

  const siteURL = 'http://localhost:3000';
  const date = new Date();

  const feed = new Feed({
    title: "Hexlet Guides",
    description: "Полезные статьи и гайды для разработчиков",
    id: siteURL,
    link: siteURL,
    language: locale,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    updated: date, // today's date
    feedLinks: {
      rss2: `${siteURL}/feed.xml`,
    },
    author: 'Kirill Mokevnin',
  });

  postsToShow.forEach((post) => {
    feed.addItem({
      title: post.header,
      id: post.sourceUrl,
      link: post.sourceUrl,
      description: post.summary,
      content: post.content,
      author: {
        name: post.author,
      },
      // image: post.image,
      // date: new Date(post.date),
    });
  });

  fs.writeFileSync("./public/feed.xml", feed.rss2());
};
