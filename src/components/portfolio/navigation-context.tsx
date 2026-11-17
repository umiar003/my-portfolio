'use client';
import { createContext, useRef, type MutableRefObject } from 'react';

export const GalleryOpenerContext = createContext<MutableRefObject<{
  element: HTMLElement;
  href: string;
} | null> | null>(null);
export function PortfolioNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const opener = useRef<{ element: HTMLElement; href: string } | null>(null);
  return (
    <GalleryOpenerContext.Provider value={opener}>
      <div
        onClickCapture={(event) => {
          const target = event.target as HTMLElement;
          const link = target.closest<HTMLElement>('a[data-portfolio-open]');
          if (link && !target.closest('[role="dialog"]'))
            opener.current = {
              element: link,
              href: link.getAttribute('href') ?? '',
            };
        }}
      >
        {children}
      </div>
    </GalleryOpenerContext.Provider>
  );
}
