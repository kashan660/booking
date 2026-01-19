import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <Link href="/" className="mb-3 flex items-center justify-center md:justify-start gap-2">
              <Image src="/logo-white.svg" alt="Lugvia" width={24} height={24} className="h-6 w-6" />
              <span className="text-lg font-bold text-white">Lugvia.com</span>
            </Link>
            <p className="text-sm mb-4 leading-relaxed max-w-xs mx-auto md:mx-0">
              Your trusted partner for worldwide airport transfers.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="https://facebook.com/lugvia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Lugvia on Facebook">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="https://twitter.com/lugvia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Lugvia on Twitter">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="https://instagram.com/lugvia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Lugvia on Instagram">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="https://linkedin.com/company/lugvia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Lugvia on LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="text-center md:text-left md:pl-8">
            <h4 className="text-base font-semibold mb-3 text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-base font-semibold mb-3 text-white">Contact Info</h4>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Business Street, Tech City</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+44 7466 779542</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@lugvia.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-slate-800/50 text-center">
          <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} Lugvia.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
