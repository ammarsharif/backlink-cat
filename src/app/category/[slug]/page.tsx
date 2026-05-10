import { Metadata } from 'next';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Container } from '@/components/ui/Container';
import { Guarantees } from '@/components/sections/Guarantees';
import { CategoryPageClient } from '@/components/marketplace/CategoryPageClient';

// In Next.js 15, params is a Promise — always await it before use.
interface Props {
  params: Promise<{ slug: string }>;
}

function slugToTitle(slug: string): string {
  if (slug === 'all') return 'Marketplace';
  return decodeURIComponent(slug)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slugToTitle(slug);

  return {
    title: `${categoryName} Websites – BacklinkCAT`,
    description: `Browse premium ${categoryName} websites for high-quality backlinks. Filter by DA, DR, traffic, niche, and price.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  // Await params before reading slug (Next.js 15 requirement)
  const { slug } = await params;

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen pt-12">
        <Container size="wide" className="max-w-[1534px]">
          <CategoryPageClient slug={slug} />
        </Container>

        <Guarantees />
      </main>
      <Footer />
    </>
  );
}
