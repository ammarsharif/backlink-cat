import { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog - BacklinkCAT",
  description: "Read the latest insights about SEO, digital marketing, and link building.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <BlogHero />

        <Container size="wide" className="max-w-[1534px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-12 pb-20">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <h2 className="text-[40px] md:text-[52px] font-bold mb-10 font-[var(--font-poppins)]">
                <span className="text-[#6EBD44]">Latest</span> Posts
              </h2>

              {/* BlogList renders all Firebase posts with pagination, filtering & error states */}
              <BlogList />
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
