// @ts-check
import yaml from 'yaml';
import { optimizeBlogImages } from './optimize-images.js';
import { promises } from 'fs';

const { readFile, writeFile } = promises;

(async () => {
  const worksFilePath = await readFile('../src/works.yaml', 'utf-8');

  /**
   * @type {
   {
      title: string; 
      url: string; 
      stack: string; 
      description: string;
      image: unknown;
      repo: {
        url: string;
        type: string
      }
    }[]
  }
   */
  const works = yaml.parse(worksFilePath);

  const dataToCreate = [];

  for (let work of works) {
    const { image } = work;
    work.image = await optimizeBlogImages(`../static/works/${image}`, false);

    dataToCreate.push(work);
  }

  await writeFile('../static/data/works.json', JSON.stringify(dataToCreate));
})();
