import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { BlogDetailClient } from '@/components/blog/BlogDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <BlogDetailClient slug={slug} />
      </main>
      <Footer />
    </>
  );
}
