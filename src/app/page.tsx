import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Categories } from '@/components/sections/Categories';
import { WhyPublishers } from '@/components/sections/WhyPublishers';
import { WhyMarketers } from '@/components/sections/WhyMarketers';
import { RecentWebsites } from '@/components/sections/RecentWebsites';
import { Testimonials } from '@/components/sections/Testimonials';
import { TrustedPublishers } from '@/components/sections/TrustedPublishers';
import { LatestPosts } from '@/components/sections/LatestPosts';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <WhyPublishers />
        <WhyMarketers />
        <RecentWebsites />
        <Testimonials />
        <TrustedPublishers />
        <LatestPosts />
      </main>
      <Footer />
    </>
  );
}
