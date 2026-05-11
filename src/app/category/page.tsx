import { Metadata } from 'next';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Container } from '@/components/ui/Container';
import { Guarantees } from '@/components/sections/Guarantees';
import { CategoryPageClient } from '@/components/marketplace/CategoryPageClient';

export const metadata: Metadata = {
  title: 'Marketplace Websites – BacklinkCAT',
  description: 'Browse all premium websites for high-quality backlinks. Filter by DA, DR, traffic, niche, and price.',
};

export default function CategoryIndexPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen pt-12">
        <Container size="wide" className="max-w-[1534px]">
          {/* We default to 'all' for the base /category route */}
          <CategoryPageClient slug="all" />
        </Container>

        <Guarantees />
      </main>
      <Footer />
    </>
  );
}
