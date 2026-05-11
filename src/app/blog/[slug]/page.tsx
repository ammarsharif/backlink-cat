import { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { Guarantees } from "@/components/sections/Guarantees";

// In Next.js 15, params is a Promise — always await it before use.
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${title} - BacklinkCAT`,
    description: `Read about ${title} and other SEO insights.`,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        {/* Blog Post Header */}
        <div className="bg-[#F9F9F9] py-16 border-b border-[#EEEEEE]">
          <Container size="wide" className="max-w-[1534px]">
            <div className="max-w-[1000px]">
              <div className="flex items-center gap-2 text-[14px] text-[#6EBD44] font-bold mb-6 font-[var(--font-inter)]">
                <span>BLOG</span>
                <span className="text-[#CCCCCC] mx-1">—</span>
                <span>SEO</span>
              </div>
              <h1 className="text-[36px] md:text-[52px] font-bold text-[#111111] leading-[1.2] mb-8 font-[var(--font-poppins)]">
                Loft Office With Vintage Decor For Your Work Space
              </h1>
              <div className="flex flex-wrap items-center gap-8 text-[15px] text-[#666666] font-[var(--font-inter)]">
                <div className="flex items-center gap-3">
                  <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-gray-200 shadow-sm border border-white">
                    <img src="/images/latest-posts.svg" alt="Author" className="w-full h-full object-cover" />
                  </div>
                  <span>By <span className="font-bold text-[#333]">darik Jen</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#6EBD44]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">24-jan-2022</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#6EBD44]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span className="font-medium">12 Comments</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container size="wide" className="max-w-[1534px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 py-16">
            {/* Main Content */}
            <div className="flex-1">
              <div className="font-[var(--font-inter)] text-[#444444] text-[17px] md:text-[18px] leading-[1.8]">
                <div className="rounded-[30px] overflow-hidden mb-12 shadow-md">
                  <img src="/images/blog-image.svg" alt="Blog Featured" className="w-full h-auto object-cover aspect-video" />
                </div>
                
                <p className="mb-8">
                  It's no secret that the digital industry is booming. From exciting startups to global brands, companies are reaching out to digital agencies, responding to the new possibilities available. However, the industry is also fast-paced, and it can be difficult to keep up with the latest trends and technologies.
                </p>
                
                <h2 className="text-[28px] md:text-[34px] font-bold text-black mt-12 mb-8 font-[var(--font-poppins)] leading-tight">
                  The Importance of Quality Content
                </h2>
                <p className="mb-8">
                  One of the most important aspects of any digital marketing strategy is quality content. Whether it's a blog post, a social media update, or a white paper, your content needs to be engaging, informative, and relevant to your target audience.
                </p>
                
                <blockquote className="border-l-[6px] border-[#6EBD44] pl-8 py-4 my-12 italic text-[22px] md:text-[26px] text-[#333333] bg-[#F9FFF5] rounded-r-[20px] font-[var(--font-poppins)]">
                  "Content is king, but engagement is queen, and she rules the house!"
                </blockquote>

                <p className="mb-8">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                  <div className="rounded-[20px] overflow-hidden shadow-sm">
                    <img src="/images/blog-image.svg" alt="Inner image 1" className="w-full h-full object-cover aspect-square md:aspect-video" />
                  </div>
                  <div className="rounded-[20px] overflow-hidden shadow-sm">
                    <img src="/images/blog-image.svg" alt="Inner image 2" className="w-full h-full object-cover aspect-square md:aspect-video" />
                  </div>
                </div>

                <p className="mb-8">
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>

                <p className="mb-8 font-medium text-black">
                  Key Takeaways:
                </p>
                <ul className="list-disc pl-6 mb-10 space-y-3">
                  <li>Focus on user intent and high-quality research</li>
                  <li>Incorporate visual elements like images and infographics</li>
                  <li>Optimize for both search engines and human readers</li>
                  <li>Keep content updated with the latest industry statistics</li>
                </ul>

                <p>
                  In conclusion, while the tools and platforms may change, the core principle remains the same: provide value to your audience. By focusing on quality and relevance, you can build a sustainable digital presence that stands the test of time.
                </p>
              </div>

              {/* Share & Tags */}
              <div className="mt-20 pt-10 border-t border-[#EEEEEE] flex flex-wrap items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-black text-[18px] font-[var(--font-poppins)]">Tags:</span>
                  <div className="flex flex-wrap gap-2.5">
                    {["SEO", "Marketing", "Digital"].map((tag) => (
                      <span key={tag} className="px-5 py-2 bg-[#F5F5F5] text-[#666] text-[15px] font-medium rounded-full hover:bg-[#6EBD44] hover:text-white transition-all cursor-pointer shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <span className="font-bold text-black text-[18px] font-[var(--font-poppins)]">Share:</span>
                  <div className="flex items-center gap-3">
                    <SocialIcon icon="/images/facebook-colored.svg" />
                    <SocialIcon icon="/images/twitter-colored.svg" />
                    <SocialIcon icon="/images/linkedin-colored.svg" />
                    <SocialIcon icon="/images/instagram-colored.svg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[391px] shrink-0">
              <BlogSidebar />
            </div>
          </div>
        </Container>

        {/* Related Posts Section */}
        <LatestPosts />

        {/* Followup Section (Guarantees) */}
        <Guarantees />
      </main>
      <Footer />
    </>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  return (
    <a href="#" className="w-[44px] h-[44px] flex items-center justify-center rounded-full border border-[#E0E0E0] bg-white hover:border-[#6EBD44] hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95">
      <img src={icon} alt="" className="w-[20px] h-[20px]" />
    </a>
  );
}
