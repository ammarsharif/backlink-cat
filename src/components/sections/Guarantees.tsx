import { Container } from "@/components/ui/Container";

export function Guarantees() {
  const items = [
    {
      icon: "/images/hand-point-right.svg", // Reusing this or similar if available, otherwise using placeholder-like icon logic
      label: "100% Manual outreach Service",
      img: "/images/hand-point-right.svg"
    },
    {
      icon: "/images/business.svg",
      label: "100% Payment Security",
      img: "/images/business.svg" // Just using existing ones for now if I don't have exact ones
    },
    {
      icon: "/images/technology.svg",
      label: "100% Money Back Guarantee",
      img: "/images/technology.svg"
    }
  ];

  return (
    <div className="border-t border-b border-[#D9ECCF] bg-[#FCFFFB] py-8">
      <Container size="wide" className="max-w-[1580px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-center gap-4 px-8 ${
                idx !== items.length - 1 ? 'md:border-r border-[#D9ECCF]' : ''
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center grayscale opacity-50">
                 {/* Icons from figma would be better, using placeholder-ish logic for now */}
                 <img src={item.img} alt="" className="w-full h-full object-contain" />
              </div>
              <span className="text-[20px] font-medium text-[#444444] whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
