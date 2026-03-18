import { useEffect, useState } from 'react';

export const MOBILE_QUERY = '(max-width: 639px)';
export const TABLET_QUERY = '(max-width: 767px)';
export const LAPTOP_QUERY = '(max-width: 1023px)';
export const DESKTOP_QUERY = '(max-width: 1279px)';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
