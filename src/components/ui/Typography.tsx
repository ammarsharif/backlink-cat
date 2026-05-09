import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const headingSizes = {
  xs: 'text-base font-semibold',
  sm: 'text-lg font-semibold',
  md: 'text-xl font-bold',
  lg: 'text-2xl md:text-3xl font-bold',
  xl: 'text-3xl md:text-4xl font-bold',
  '2xl': 'text-4xl md:text-5xl font-extrabold',
};

export function Heading({ as: Tag = 'h2', size = 'lg', className, children, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(
        'font-[var(--font-heading)] text-[var(--color-text-heading)] leading-tight',
        headingSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg';
  muted?: boolean;
}

export function Text({ size = 'base', muted = false, className, children, ...props }: TextProps) {
  return (
    <p
      className={cn(
        'font-[var(--font-body)] leading-relaxed',
        size === 'xs' && 'text-xs',
        size === 'sm' && 'text-sm',
        size === 'base' && 'text-base',
        size === 'lg' && 'text-lg',
        muted ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-secondary)]',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
