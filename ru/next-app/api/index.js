import path from 'path';
import fsp from 'fs/promises';

import yaml from 'js-yaml';
import matter from 'gray-matter';

export const getConfig = async () => {
  const configPath = path.join(process.cwd(), 'data', 'config.yml');
  const content = await fsp.readFile(configPath, 'utf-8');

  return yaml.load(content);
};

const readPost = async (filePath) => {
  const fileContent = await fsp.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const { name } = path.parse(filePath);

  return {
    ...data,
    content,
    filePath,
    name: name.slice(11),
  };
};

const getPublishedPosts = async (locale) => {
  const postsPath = path.resolve(process.cwd(), 'data', 'posts', locale);
  const entries = await fsp.readdir(postsPath, { withFileTypes: true });
  const fileNames = entries
    .filter((entry) => entry.isFile())
    .filter(({ name }) => path.extname(name) === '.md')
    .map(({ name }) => name);

  const promises = fileNames
    .sort((a, b) => b.localeCompare(a))
    .map(async (name) => readPost(path.join(postsPath, name)));

  const posts = await Promise.all(promises);

  return posts.filter(({ hidden = false }) => !hidden);
};

export const getPostsList = async (locale) => {
  const posts = await getPublishedPosts(locale);

  return posts.map(({
    title, header = title,
    description, summary = description,
    name,
  }) => ({
    header,
    summary,
    name,
  }));
};

export const findPost = async (name, locale) => {
  const posts = await getPublishedPosts(locale);
  const post = posts.find((post) => post.name === name);

  const {
    title, header = title,
    description, summary = description,
    ...props
  } = post;

  return {
    header,
    summary,
    ...props,
  };
};
