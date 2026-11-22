'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import fluidCursor from '@/hooks/use-FluidCursor';

const FluidCursor = () => {
  const isHome = usePathname() === '/';
  useEffect(() => {
    return fluidCursor();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 ${isHome ? 'z-0' : 'z-[65]'}`}
    >
      <canvas id="fluid" className="block h-full w-full" />
    </div>
  );
};
export default FluidCursor;
