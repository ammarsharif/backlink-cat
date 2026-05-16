import { Container } from '@/components/ui/Container';

interface WhyChooseEmptyProps {
  title: string;
}

export function WhyChooseEmpty({ title }: WhyChooseEmptyProps) {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <Container className="max-w-[1440px]">
        <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-center mb-12 font-[family-name:var(--font-heading)] leading-tight">
          {title.includes('Publishers') ? (
            <>
              <span className="text-[#7FC142]">Why Publishers</span> Choose Us?
            </>
          ) : (
            <>
              <span className="text-[#7FC142]">Why Marketers</span> Choose Us?
            </>
          )}
        </h2>

        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">Content not available</p>
          <p className="text-gray-400 text-sm max-w-xs">
            This section hasn&apos;t been set up yet. Check back soon.
          </p>
        </div>
      </Container>
    </section>
  );
}
