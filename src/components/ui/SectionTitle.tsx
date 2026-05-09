import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  accent?: string;
  className?: string;
  centered?: boolean;
}

export function SectionTitle({ title, accent, className, centered = true }: SectionTitleProps) {
  const parts = accent ? title.split(accent) : [title];

  return (
    <h2
      className={cn(
        'text-2xl md:text-3xl font-bold font-[var(--font-heading)] text-[var(--color-text-heading)] mb-2',
        centered && 'text-center',
        className
      )}
    >
      {parts[0]}
      {accent && (
        <span className="text-[var(--color-text-accent)]">{accent}</span>
      )}
      {parts[1]}
    </h2>
  );
}
