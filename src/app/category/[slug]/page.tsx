import { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { SidebarFilter } from "@/components/marketplace/SidebarFilter";
import { WebsiteCard, Website } from "@/components/marketplace/WebsiteCard";
import { Pagination } from "@/components/marketplace/Pagination";
import { Guarantees } from "@/components/sections/Guarantees";

export const metadata: Metadata = {
  title: "Category Name - BacklinkCAT",
  description: "Browse premium websites for backlinks in the Category Name niche.",
};

const MOCK_SITES: Website[] = Array(10).fill(null).map((_, i) => ({
  id: `site-${i}`,
  url: "www.website.com",
  da: 70,
  ss: 7,
  dr: 70,
  traffic: "50,000",
  linkType: "DF",
  niches: ["Tech", "Life Style", "Travelling", "Education", "Business"],
  gpPrice: "$100",
  liPrice: "$50",
  cryptoPrice: "$250",
  reviews: 5,
}));

const RELATED_CATEGORIES = [
  { name: "Education", count: 44 },
  { name: "Insurance", count: "" },
  { name: "Business", count: "" },
  { name: "Lifestyle", count: "" },
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // In a real app, we would fetch data based on params.slug
  const categoryName = "Name"; // Simplified for now to match Figma exactly

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen pt-12">
        <Container size="wide" className="max-w-[1534px]">
          {/* Header Section - Stays at top on all screens */}
          <div className="mb-12">
            <h1 className="text-[54px] font-bold font-[var(--font-heading)] mb-6">
              <span className="text-[#7FC142]">Category</span> {categoryName} (h1)
            </h1>
            <p className="text-[20px] text-[#444444] leading-relaxed max-w-[1100px]">
              of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>

          {/* Related Categories - Stays above the main split on all screens */}
          <div className="mb-12">
            <h2 className="text-[44px] font-bold font-[var(--font-heading)] mb-8">
              <span className="text-[#7FC142]">Related</span> Categories (h2)
            </h2>
            <div className="flex flex-col gap-4">
              {RELATED_CATEGORIES.map((cat) => (
                <a 
                  key={cat.name} 
                  href="#" 
                  className="flex items-center gap-3 group transition-all"
                >
                  <span className="text-[#7FC142] text-[24px] font-bold">{">"}</span>
                  <span className="text-[24px] font-medium text-[#7FC142] underline decoration-1 underline-offset-4 group-hover:text-[#6EBD44]">
                    {cat.name}
                  </span>
                  {cat.count && (
                    <span className="text-[24px] font-medium text-[#444444] opacity-60">
                      (h4)
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-0 pb-20 items-start overflow-visible">
            {/* Left Content Area (Main) */}
            <div className="w-full lg:flex-1 overflow-visible">
              {/* Website List */}
              <div className="flex flex-col gap-6">
                {MOCK_SITES.map((site) => (
                  <WebsiteCard key={site.id} site={site} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination />
            </div>

            {/* Right Sidebar (Filters) */}
            <div className="w-full lg:w-[391px] lg:pl-8 mb-12 lg:mb-0 shrink-0">
              <SidebarFilter />
            </div>
          </div>
        </Container>
        
        {/* Pre-footer Guarantees */}
        <Guarantees />
      </main>
      <Footer />
    </>
  );
}
