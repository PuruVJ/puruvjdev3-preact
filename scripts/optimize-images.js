import { promises as fsp } from 'fs';
import fetch from 'node-fetch';
import { cloudinary } from './cloudinary.js';
import { ASSETS_ROOT_PATH, RELATIVE_ASSETS_PATH } from './constants.js';
import { gifMarkup, optimizeGif } from './gif-module.js';

/**
 * Optimize the image and create its different versions
 * Assuming the image is media folder in assets
 * @param {string} src
 */
export async function optimizeBlogImages(src, returnMarkup = true) {
  // Start measuring
  console.log('Starting to retrieve/create image/data');

  // First off, don't optimize this image and save us some CPU time if it already exists
  // First get the filename
  const [filePath, baseFolder] = src.split('/').reverse();
  const [fileName] = filePath.split('.');

  const [format] = filePath.split('.').reverse();

  /*
   * The vars are of this pattern:
   * /{baseFolder}/{fileName}.{format}
   */

  const folderPath = `${ASSETS_ROOT_PATH}/${baseFolder}/${fileName}`;

  /** @param {'large' | 'small'} size */
  const getOrgPath = (size) =>
    `${RELATIVE_ASSETS_PATH}/${baseFolder}/${fileName}/${size}.${format}`;

  /**
   * The list of file paths to return
   * @type {import('./scripts.js').ExportedImagesMetaData}
   */
  const list = {
    large: {
      org: getOrgPath('large'),
    },
    small: {
      org: getOrgPath('small'),
    },
    aspectHTW: 1,
  };

  let shouldOptimize = true;

  // Check if this folder exists
  try {
    await fsp.access(folderPath);
    shouldOptimize = false;

    if ((await fsp.readdir(folderPath)).includes('data.json') && format !== 'gif') {
      // The data file exists. Get the aspect ratio from there
      const { aspectHTW } = JSON.parse(await fsp.readFile(`${folderPath}/data.json`, 'utf-8'));

      list.aspectHTW = aspectHTW;
    }
  } catch {}

  // The markup

  // Should not optimize, if not gif
  if (!shouldOptimize && format !== 'gif') {
    // Log the time
    console.log(`Finished.`);
    console.log();
    return returnMarkup ? markup(list, format) : list;
  }

  // Optimize if GIF
  if (format === 'gif') {
    // Do the gif-specific optimizations and return early
    console.log('GIF detected!');

    if (shouldOptimize) await optimizeGif(fileName);

    return gifMarkup(fileName);
  }

  // The image is optimizable. That means work, boys!
  // Let's try make the folder
  try {
    await fsp.mkdir(`${ASSETS_ROOT_PATH}/${baseFolder}/${fileName}`);
  } catch (e) {}

  /** @param {number} width */
  const upload = (width) =>
    cloudinary.uploader.upload(`${folderPath}.${format}`, {
      format,
      folder: 'media',
      transformation: [
        {
          quality: 80,
          width,
          crop: 'scale',
        },
      ],
      use_filename: true,
      overwrite: true,
    });

  /** @param {string} path */
  const fetchImg = (path) => fetch(path).then((res) => res.buffer());

  const [bigOriginal, smallOriginal] = await Promise.all([upload(1200), upload(600)]);
  const [bigOriginalBfr, smallOriginalBfr] = await Promise.all([
    fetchImg(bigOriginal.url),
    fetchImg(smallOriginal.url),
  ]);

  // get aspect ratio
  list.aspectHTW = bigOriginal.height / bigOriginal.width;

  // Write inside the folder
  await fsp.writeFile(`${folderPath}/large.${format}`, bigOriginalBfr);
  await fsp.writeFile(`${folderPath}/small.${format}`, smallOriginalBfr);

  // Also write the data.json
  await fsp.writeFile(
    `${folderPath}/data.json`,
    JSON.stringify({
      aspectHTW: list.aspectHTW,
    })
  );

  // Log the time
  console.log(`Finished`);
  console.log();

  // Return the list
  return returnMarkup ? markup(list, format) : list;
}

// try {
//   optimizeBlogImages('../../static/media/deep-dive-preact-source--wait-what.gif', false);
// } catch (e) {
//   console.log(e);
// }

/**
 * @param {import('./scripts.js').ExportedImagesMetaData} list
 * @param {string} format
 */
function markup(list, format) {
  return `
  <figure style="width: 100%;--padding-top: ${list.aspectHTW * 100}%;">
    <picture>
      <source
        type="image/${format}"
        media="(min-width: 501px)"
        data-srcset="${list.large.org}"
      ></source>
      <source
        type="image/${format}"
        media="(max-width: 500px)"
        data-srcset="${list.small.org}"
      ></source>
      <img alt="Placeholder"
      data-src="${list.large.org}"
      class="lazyload blog-img" />
    </picture>
  </figure>
  `;
}
