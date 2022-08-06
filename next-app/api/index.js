import path from 'path';
import fsp from 'fs/promises';

import yaml from 'js-yaml';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypePrism from '@mapbox/rehype-prism';
import { serialize } from 'next-mdx-remote/serialize';

export const getConfig = async () => {
  const configPath = path.join(process.cwd(), 'data', 'config.yml');
  const content = await fsp.readFile(configPath, 'utf-8');

  return yaml.load(content);
};

const readPost = async (filePath) => {
  const fileContent = await fsp.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const { name } = path.parse(filePath);
  const {
    title = null, header = title,
    description = null, summary = description,
    ...props
  } = data;

  return {
    header,
    summary,
    content,
    filePath,
    name: name.slice(11),
    ...props,
  };
};

export const getPublishedPosts = async (locale) => {
  const postsPath = path.resolve(process.cwd(), 'data', 'posts', locale);
  const entries = await fsp.readdir(postsPath, { withFileTypes: true });
  const fileNames = entries
    .filter((entry) => entry.isFile())
    .filter(({ name }) => path.extname(name) === '.md')
    .map(({ name }) => name);

  const promises = fileNames
    .sort((a, b) => b.localeCompare(a))
    .map(async (name) => readPost(path.join(postsPath, name)));

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

  if (!post) {
    return null;
  }

  const { content, ...props } = post;
  const { compiledSource } = await serialize(content, {
    mdxOptions:{
      rehypePlugins: [rehypePrism],
      remarkPlugins: [remarkGfm],
      format: 'md',
    },
    parseFrontmatter: false,
  });

  return {
    ...props,
    content: compiledSource,
  };
};
