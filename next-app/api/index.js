import path from 'path';
import fsp from 'fs/promises';

import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypePrism from '@mapbox/rehype-prism';
import { serialize } from 'next-mdx-remote/serialize';

import config from '../data/config.js';

const readPost = async (filePath, basePath) => {
  const fileContent = await fsp.readFile(path.join(basePath, filePath), 'utf-8');
  const { data, content } = matter(fileContent);
  const { name } = path.parse(filePath);
  const { title = null, header = title, description = null, summary = description, ...props } = data;
  const sourceUrl = `${config.repositoryUrl}/tree/main/${filePath}`;

  return {
    header,
    summary,
    content,
    sourceUrl,
    name: name.slice(11),
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
    .sort((a, b) => b.localeCompare(a))
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
    }));
};

export const findPost = async (name, locale) => {
  const posts = await getPublishedPosts(locale);
  const postIndex = posts.findIndex((post) => post.name === name);

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
