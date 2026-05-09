'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-cta-bg)] text-white hover:bg-[var(--color-cta-hover)] shadow-sm',
        secondary:
          'bg-white text-[var(--color-cta-bg)] border-2 border-[var(--color-cta-bg)] hover:bg-[var(--color-state-hover)]',
        ghost:
          'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-state-hover)]',
        outline:
          'bg-transparent text-white border-2 border-white hover:bg-white/10',
        white:
          'bg-white text-[var(--color-cta-bg)] hover:bg-gray-100 shadow-sm',
      },
      size: {
        sm: 'px-4 py-1.5 text-sm rounded-[var(--radius-md)]',
        md: 'px-6 py-2.5 text-sm rounded-[var(--radius-md)]',
        lg: 'px-8 py-3 text-base rounded-[var(--radius-lg)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button, buttonVariants };
