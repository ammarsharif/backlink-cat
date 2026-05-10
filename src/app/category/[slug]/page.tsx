import { Metadata } from 'next';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Container } from '@/components/ui/Container';
import { Guarantees } from '@/components/sections/Guarantees';
import { CategoryPageClient } from '@/components/marketplace/CategoryPageClient';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const categoryName =
    slug === 'all'
      ? 'All'
      : decodeURIComponent(slug)
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${categoryName} Websites – BacklinkCAT`,
    description: `Browse premium ${categoryName} websites for high-quality backlinks. Filter by DA, DR, traffic, niche, and price.`,
  };
}

export default function CategoryPage({ params }: Props) {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen pt-12">
        <Container size="wide" className="max-w-[1534px]">
          <CategoryPageClient slug={params.slug} />
        </Container>

        {/* Pre-footer Guarantees */}
        <Guarantees />
      </main>
      <Footer />
    </>
  );
}
