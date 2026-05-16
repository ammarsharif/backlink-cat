import { Suspense } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Categories } from '@/components/sections/Categories';
import { WhyPublishers } from '@/components/sections/WhyPublishers';
import { WhyMarketers } from '@/components/sections/WhyMarketers';
import { WhyChooseSkeleton } from '@/components/sections/WhyChooseSkeleton';
import { RecentWebsites } from '@/components/sections/RecentWebsites';
import { Testimonials } from '@/components/sections/Testimonials';
import { TrustedPublishers } from '@/components/sections/TrustedPublishers';
import { LatestPosts } from '@/components/sections/LatestPosts';
import { Footer } from '@/components/sections/Footer';

export default async function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="relative overflow-hidden w-full min-h-[1250px] flex flex-col">
          {/* Main Background Image spanning Hero and Categories */}
          <div className="absolute top-0 left-0 w-full h-[1250px] pointer-events-none z-0">
            <img
              src="/images/bg-colored-image.svg"
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="relative z-10 flex flex-col flex-1">
            <Hero />
            <div className="mt-16" />
            <Categories />
          </div>
        </div>
        <Suspense fallback={<WhyChooseSkeleton videoPosition="right" />}>
          <WhyPublishers />
        </Suspense>
        <Suspense fallback={<WhyChooseSkeleton videoPosition="left" />}>
          <WhyMarketers />
        </Suspense>
        <RecentWebsites />
        <Testimonials />
        <TrustedPublishers />
        <LatestPosts />
      </main>
      <Footer />
    </>
  );
}
