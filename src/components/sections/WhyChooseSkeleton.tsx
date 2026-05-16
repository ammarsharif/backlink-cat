import { Container } from '@/components/ui/Container';

interface WhyChooseSkeletonProps {
  videoPosition?: 'left' | 'right';
}

function FeaturesSkeleton() {
  const widths = ['72%', '58%', '65%', '80%', '55%', '70%', '60%'];
  return (
    <ul className="space-y-3">
      {widths.map((w, i) => (
        <li key={i} className="flex items-center gap-4">
          <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded bg-gray-200 animate-pulse shrink-0" />
          <div
            className="h-4 md:h-5 lg:h-6 rounded-md bg-gray-200 animate-pulse"
            style={{ width: w }}
          />
        </li>
      ))}
    </ul>
  );
}

function VideoSkeleton() {
  return (
    <div className="relative rounded-[20px] overflow-hidden bg-gray-200 animate-pulse aspect-video w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse" />
      </div>
    </div>
  );
}

export function WhyChooseSkeleton({ videoPosition = 'right' }: WhyChooseSkeletonProps) {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <Container className="max-w-[1440px]">
        {/* Title skeleton */}
        <div className="flex justify-center mb-12">
          <div className="h-9 md:h-10 lg:h-12 w-72 md:w-96 rounded-lg bg-gray-200 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
          {videoPosition === 'right' ? (
            <>
              <div className="lg:col-span-5 order-2 lg:order-1">
                <FeaturesSkeleton />
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 w-full">
                <VideoSkeleton />
              </div>
            </>
          ) : (
            <>
              <div className="lg:col-span-7 w-full order-1">
                <VideoSkeleton />
              </div>
              <div className="lg:col-span-5 w-full order-2">
                <FeaturesSkeleton />
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
