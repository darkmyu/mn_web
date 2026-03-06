import type { ImageLoaderProps } from 'next/image';

const ALLOWED_DOMAINS = ['image-dev.mongnyang.com', 'image.mongnyang.com'];

export function optimizeImage({ src, width, quality }: ImageLoaderProps) {
  const params = [`width=${width}`, 'format=auto'];

  if (quality) {
    params.push(`quality=${quality}`);
  }

  const url = new URL(src);
  const origin = url.origin;
  const hostname = url.hostname;
  const pathname = url.pathname;

  if (!ALLOWED_DOMAINS.includes(hostname)) {
    return src;
  }

  if (process.env.NODE_ENV === 'development') {
    return `${src}?${params.join('&')}`;
  }

  return `${origin}/cdn-cgi/image/${params.join(',')}${pathname}`;
}
