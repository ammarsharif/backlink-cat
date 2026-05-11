import { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogPagination } from "@/components/blog/BlogPagination";

export const metadata: Metadata = {
  title: "Blog - BacklinkCAT",
  description: "Read the latest insights about SEO, digital marketing, and link building.",
};

const BLOG_POSTS = Array(6).fill(null).map((_, i) => ({
  id: `post-${i}`,
  slug: `loft-office-with-vintage-decor-${i}`,
  image: "/images/blog-image.svg",
  title: "Loft Office With Vintage Decor For......",
  excerpt: "It's no secret that the digital industry is booming. From exciting startups to global brands, companies are reaching out to digital agencies, ...",
  author: "darik Jen",
  category: "SEO",
  date: "24-jan-2022",
}));

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <BlogHero />

        <Container size="wide" className="max-w-[1534px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-12 pb-20">
            {/* Main Content */}
            <div className="flex-1">
              <h2 className="text-[40px] md:text-[52px] font-bold mb-10 font-[var(--font-poppins)]">
                <span className="text-[#6EBD44]">Latest</span> Posts
              </h2>

              <div className="space-y-10">
                {BLOG_POSTS.map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>

              <BlogPagination />
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[391px] shrink-0">
              <BlogSidebar />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
