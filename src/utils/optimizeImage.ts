import type { ImageLoaderProps } from 'next/image';

export function optimizeImage({ src, width, quality }: ImageLoaderProps) {
  const params = [`width=${width}`, 'format=auto'];

  if (quality) {
    params.push(`quality=${quality}`);
  }

  const url = new URL(src);
  const origin = url.origin;
  const pathname = url.pathname;

  if (process.env.NODE_ENV === 'development') {
    return `${src}?${params.join('&')}`;
  }

  return `${origin}/cdn-cgi/image/${params.join(',')}${pathname}`;
}
