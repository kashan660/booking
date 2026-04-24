import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";

export async function Footer() {
  const settings = await getSiteSettings();
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <Link href="/" className="mb-3 flex items-center justify-center md:justify-start gap-2">
              <Image src="/logo-white.svg" alt={settings.brandName} width={24} height={24} className="h-6 w-6" />
              <span className="text-lg font-bold text-white">{settings.brandName}</span>
            </Link>
            <p className="text-sm mb-4 leading-relaxed max-w-xs mx-auto md:mx-0">
              Trusted packers and movers for local and long-distance moves across the USA.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {settings.facebookUrl ? (
                <Link
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
              ) : null}
              {settings.instagramUrl ? (
                <Link
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              ) : null}
              {settings.twitterUrl ? (
                <Link
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Twitter/X"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
              ) : null}
              {settings.youtubeUrl ? (
                <Link
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="text-center md:text-left md:pl-8">
            <h4 className="text-base font-semibold mb-3 text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/movers" className="hover:text-white transition-colors">Cities</Link>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/get-a-quote" className="hover:text-white transition-colors">Get a Quote</Link>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-base font-semibold mb-3 text-white">Contact Info</h4>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{settings.addressLine || "USA"}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>{settings.primaryPhone || settings.whatsappNumber}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{settings.supportEmail || "support@example.com"}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-slate-800/50 text-center">
          <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} {settings.brandName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
