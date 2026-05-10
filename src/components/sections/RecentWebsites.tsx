import { Container } from "@/components/ui/Container";
import { WebsiteCard } from "@/components/marketplace/WebsiteCard";

const MOCK_WEBSITES = [
  {
    id: "site-1",
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
  },
  {
    id: "site-2",
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
  },
  {
    id: "site-3",
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
  },
  {
    id: "site-4",
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
  },
];

export function RecentWebsites() {
  return (
    <section className="py-20 bg-[#F9F9F9]">
      <Container className="max-w-[1534px]">
        <h2 className="text-[32px] md:text-[54px] font-bold text-center mb-16 font-[var(--font-heading)]">
          <span className="text-[#7FC142]">Recently Added</span> Websites
        </h2>

        <div className="flex flex-col gap-6">
          {MOCK_WEBSITES.map((site) => (
            <WebsiteCard key={site.id} site={site} />
          ))}
        </div>
      </Container>
    </section>
  );
}
