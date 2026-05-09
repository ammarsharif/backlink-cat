import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[var(--color-bg-card)] border border-[var(--color-border-card)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)]',
        hover && 'transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
