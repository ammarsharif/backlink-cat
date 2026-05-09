import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

const badgeVariants = cva(
  'inline-flex items-center font-medium text-xs px-2.5 py-0.5',
  {
    variants: {
      variant: {
        green:
          'bg-green-100 text-[var(--color-cta-bg)] rounded-[var(--radius-full)]',
        outline:
          'border border-[var(--color-border-default)] text-[var(--color-text-secondary)] rounded-[var(--radius-full)]',
        solid:
          'bg-[var(--color-cta-bg)] text-white rounded-[var(--radius-full)]',
      },
    },
    defaultVariants: {
      variant: 'green',
    },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
