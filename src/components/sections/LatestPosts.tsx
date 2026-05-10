import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Calendar } from "lucide-react";

const POSTS = [
  {
    id: "1",
    image: "/images/latest-posts.svg",
    title: "How to Build a High-Quality Backlink Profile in 2024",
    category: "Marketing",
    date: "May 10, 2024",
    excerpt:
      "Developing a high-quality backlink profile is more critical than ever. In this guide, we'll explore the latest strategies to secure authoritative links that boost your rankings safely.",
    href: "#",
  },
  {
    id: "2",
    image: "/images/latest-posts.svg",
    title: "10 SEO Trends You Need to Watch This Year",
    category: "Marketing",
    date: "May 08, 2024",
    excerpt:
      "SEO is constantly evolving. From AI-generated content to E-E-A-T, we break down the top trends that will define the digital marketing landscape in the coming months.",
    href: "#",
  },
  {
    id: "3",
    image: "/images/latest-posts.svg",
    title: "Why Content Relevancy is the Key to Success",
    category: "Marketing",
    date: "May 05, 2024",
    excerpt:
      "Links alone aren't enough. Discover why matching your content to your target audience's intent is the most important factor in driving sustainable organic traffic.",
    href: "#",
  },
];

export function LatestPosts() {
  return (
    <section className="py-20 bg-white">
      <Container className="max-w-[1534px]">
        <h2 className="text-[32px] md:text-[54px] font-bold text-center mb-16 font-[var(--font-heading)]">
          Latest <span className="text-[#6EBD44]">Posts</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-white border border-[#E0E0E0] rounded-[16px] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Post image */}
              <div className="h-[220px] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-black text-[20px] leading-tight mb-3 group-hover:text-[#7FC142] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-[14px] text-[#666666] leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto">
                  <Button 
                    variant="outline"
                    className="border-[#6EBD44] text-[#6EBD44] hover:bg-[#6EBD44] hover:text-white rounded-full px-6 h-10 text-[14px] font-bold transition-all"
                  >
                    READ MORE
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            className="bg-[#6EBD44] hover:bg-[#5DA539] text-white h-[55px] px-10 text-[18px] font-bold rounded-full transition-all"
          >
            VIEW ALL POSTS
          </Button>
        </div>
      </Container>
    </section>
  );
}
