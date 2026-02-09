import React, { useLayoutEffect, useRef } from 'react';
import { Sheet as ReactModalSheet } from 'react-modal-sheet';

export const Sheet = {
  Root: ReactModalSheet,
  Backdrop: SheetBackdrop,
  Container: SheetContainer,
  Content: SheetContent,
};

function SheetBackdrop({ children, className, ...props }: React.ComponentProps<typeof ReactModalSheet.Backdrop>) {
  return (
    <ReactModalSheet.Backdrop className={`bg-black/10 backdrop-blur-xs ${className}`} {...props}>
      {children}
    </ReactModalSheet.Backdrop>
  );
}

function SheetContainer({ children, className, ...props }: React.ComponentProps<typeof ReactModalSheet.Container>) {
  return (
    <ReactModalSheet.Container className={`bg-zinc-50! dark:bg-zinc-900! ${className}`} {...props}>
      {children}
    </ReactModalSheet.Container>
  );
}

function SheetContent({ children, ...props }: React.ComponentProps<typeof ReactModalSheet.Content>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!scrollRef.current) return;

    const scroller = scrollRef.current;
    const originalOnScroll = scroller.onscroll;

    scroller.style.touchAction = 'pan-down';

    scroller.onscroll = (e) => {
      if (scroller.scrollTop === 0) {
        scroller.style.touchAction = 'pan-down';
      } else {
        scroller.style.touchAction = 'unset';
      }

      return originalOnScroll?.call(scroller, e);
    };

    return () => void (scroller.onscroll = originalOnScroll);
  }, []);

  return (
    <ReactModalSheet.Content scrollRef={scrollRef} {...props}>
      {children}
    </ReactModalSheet.Content>
  );
}
