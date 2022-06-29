import fsp from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

export const getConfig = async () => {
  const configPath = path.join(process.cwd(), 'data', 'config.yml');
  const data = await fsp.readFile(configPath, 'utf-8');
  const config = yaml.load(data);
  return config;
};