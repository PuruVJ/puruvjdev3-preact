import path from 'path';

/** @param {string} fileName */
const normalize = (fileName) => path.normalize(fileName).split(path.sep).join(path.posix.sep);

/** @param {import('wmr').Options} config */
export default function (config) {
  config.plugins.push({
    name: 'root-resolve',
    resolveId(spec) {
      spec = normalize(spec);
      if (!spec.startsWith('~/')) return console.log(true);

      console.log(path.resolve(config.cwd, 'assets', spec.substring(2)));
      return path.resolve(config.cwd, 'assets', spec.substring(2));
    },
  });
}
