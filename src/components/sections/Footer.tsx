import { Container } from "@/components/ui/Container";
import { Mail, Phone, MapPin } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: "/images/facebook.svg" },
  { label: "Twitter", href: "#", icon: "/images/twitter.svg" },
  { label: "Instagram", href: "#", icon: "/images/instagram.svg" },
  { label: "Linkedin", href: "#", icon: "/images/linkedin.svg" },
  { label: "Youtube", href: "#", icon: "/images/youtube.svg" },
];

const USEFUL_LINKS = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "#" },
  { label: "Publishers", href: "#" },
  { label: "Marketers", href: "#" },
  { label: "Blog", href: "#" },
];

const RESOURCES = [
  { label: "Help Center", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Support", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#6EBD44] text-white pt-16 pb-8">
      <Container className="max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* About US */}
          <div>
            <h4 className="text-[24px] font-bold mb-6 !text-white">About US</h4>
            <p className="text-[16px] leading-relaxed text-white max-w-[350px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to mak...
            </p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col">
            <h4 className="text-[24px] font-bold mb-6 !text-white">Useful Links</h4>
            <ul className="space-y-3 mb-8">
              {["Home", "Category", "Stories", "Blog", "Contact", "Login"].map((label) => (
                <li key={label}>
                  <a href="#" className="text-[16px] hover:underline text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a 
              href="#" 
              className="inline-block w-fit bg-white text-black font-bold px-6 py-2 rounded-[6px] text-[14px] uppercase tracking-wide hover:bg-gray-100 transition-colors"
            >
              SIGN UP
            </a>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-[24px] font-bold mb-6 !text-white">Follow Us</h4>
            <ul className="space-y-4">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className="flex items-center gap-3 hover:underline group text-white">
                    <img 
                      src={social.icon} 
                      alt="" 
                      className="w-5 h-5 brightness-0 invert" 
                    />
                    <span className="text-[16px] text-white">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <p className="text-[16px] text-center text-white">
            Copyright &copy; 2022 By BacklinkCAT
          </p>
        </div>
      </Container>
    </footer>
  );
}
