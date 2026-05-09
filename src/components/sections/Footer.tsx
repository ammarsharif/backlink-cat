import { Link2, Camera, Globe, Play, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const USEFUL_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Category', href: '#' },
  { label: 'Stories', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Log In', href: '#' },
];

const SOCIAL_LINKS = [
  { label: 'Linkedin', href: '#', icon: Link2 },
  { label: 'Instagram', href: '#', icon: Camera },
  { label: 'Facebook', href: '#', icon: Globe },
  { label: 'Youtube', href: '#', icon: Play },
  { label: 'Twitter', href: '#', icon: X },
];

export function Footer() {
  return (
    <footer className="bg-bg-footer text-white">
      <Container>
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">About US</h4>
            <p className="text-white/80 text-xs leading-relaxed">
              {/* TODO: copy — about us paragraph */}
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Useful Links</h4>
            <ul className="space-y-2">
              {USEFUL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white text-xs transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Follow Us</h4>
            <ul className="space-y-2.5">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-2 text-white/80 hover:text-white text-xs transition-colors"
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center bg-white text-cta font-bold text-xs px-5 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                SIGN UP
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 py-4">
          <p className="text-white/70 text-xs text-center">
            Copyright &copy; 2022 By BacklinkCAT
          </p>
        </div>
      </Container>
    </footer>
  );
}
