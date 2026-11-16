'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useContext, useEffect, useRef } from 'react';
import { OverlayContext } from './detail-view';
import { GalleryOpenerContext } from './navigation-context';

export function RouteModal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const opener = useContext(GalleryOpenerContext);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (container.current) container.current.scrollTop = 0;
  }, [title]);
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md" />
        <Dialog.Content
          ref={container}
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            requestAnimationFrame(() => {
              const saved = opener?.current;
              if (!saved) return;
              const target = saved.element.isConnected
                ? saved.element
                : Array.from(
                    document.querySelectorAll<HTMLElement>(
                      'a[data-portfolio-open]'
                    )
                  ).find((link) => link.getAttribute('href') === saved.href);
              target?.focus({ preventScroll: true });
            });
          }}
          className="fixed inset-x-2 top-3 bottom-3 z-[60] mx-auto max-w-5xl overflow-y-auto overscroll-contain rounded-3xl bg-white shadow-2xl outline-none sm:inset-x-6 sm:top-8 sm:bottom-8"
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <div className="sticky top-0 z-20 flex justify-end bg-white/90 px-5 py-3 backdrop-blur-md">
            <Dialog.Close
              aria-label="Close project"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white hover:bg-neutral-700"
            >
              <X size={22} />
            </Dialog.Close>
          </div>
          <div className="px-5 pb-10 sm:px-12">
            <OverlayContext.Provider value={true}>
              {children}
            </OverlayContext.Provider>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
