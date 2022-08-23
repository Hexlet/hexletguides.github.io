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
  const {
    title = null, header = title,
    description = null, summary = description,
    ...props
  } = data;
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
  const post = posts.find((post) => post.name === name);
  const numOfposts = posts.length - 1;
  const postIndex = posts.indexOf(post);
  const nextPost = postIndex === numOfposts ? posts[0] : posts[postIndex + 1];
  const prevPost = postIndex === 0 ? posts[numOfposts] : posts[postIndex - 1];

  if (!post) {
    return null;
  }

  const { content, ...props } = post;
  const { compiledSource } = await serialize(content, {
    mdxOptions:{
      rehypePlugins: [rehypePrism],
      remarkPlugins: [remarkGfm],
      format: 'mdx',
    },
    parseFrontmatter: false,
  });

  return {
    ...props,
    nextLink: { header: nextPost.header, name: nextPost.name},
    prevLink: { header: prevPost.header, name: prevPost.name},
    content: compiledSource,
  };
};
