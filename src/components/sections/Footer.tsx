import { Container } from "@/components/ui/Container";
import { fetchWebsiteSettings } from "@/lib/settingsService";
import Link from "next/link";

export async function Footer() {
  const settings = await fetchWebsiteSettings();

  return (
    <footer className="bg-[#6EBD44] text-white pt-16 pb-8">
      <Container className="max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* About US */}
          <div>
            <h4 className="text-[24px] font-bold mb-6 !text-white">About US</h4>
            <p className="text-[16px] leading-relaxed text-white max-w-[350px]">
              {settings.aboutUsText}
            </p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col">
            <h4 className="text-[24px] font-bold mb-6 !text-white">Useful Links</h4>
            <ul className="space-y-3 mb-8">
              {settings.usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[16px] hover:underline text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a 
              href={settings.signUpUrl}
              className="inline-block w-fit bg-white text-black font-bold px-6 py-2 rounded-[6px] text-[14px] uppercase tracking-wide hover:bg-gray-100 transition-colors"
            >
              SIGN UP
            </a>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-[24px] font-bold mb-6 !text-white">Follow Us</h4>
            <ul className="space-y-4">
              {settings.socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className="flex items-center gap-3 hover:underline group text-white">
                    <img 
                      src={social.icon} 
                      alt={social.label} 
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
            {settings.copyrightText}
          </p>
        </div>
      </Container>
    </footer>
  );
}
