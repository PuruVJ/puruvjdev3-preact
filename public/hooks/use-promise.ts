import { useState } from 'preact/hooks';

const CACHE = new Map();

export const usePromise = <T>(initializer: () => Promise<T>, deps: unknown[]): T => {
  const key = deps.join('\n');
  let update = useState(0)[1];
  let p = CACHE.get(key);
  if (!p) {
    p = initializer().then(
      (v) => (p.v = v),
      (e) => (p.e = e)
    );
    CACHE.set(key, p);
  }
  if ('v' in p) return p.v;
  else if ('e' in p) throw p.e;
  else p.then(update);
  throw p;
};
