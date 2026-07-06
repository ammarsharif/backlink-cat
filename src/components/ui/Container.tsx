import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'wide' | 'narrow';
}

export function Container({ className, size = 'default', children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        size === 'default' && 'max-w-7xl min-[1920px]:max-w-[1500px]',
        size === 'wide' && 'max-w-screen-2xl min-[1920px]:max-w-[1800px]',
        size === 'narrow' && 'max-w-4xl min-[1920px]:max-w-[1100px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
