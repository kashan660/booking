"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  // Ensure readable header on non-home pages
  useEffect(() => {
    if (!isHome) setIsScrolled(true);
  }, [isHome]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!isHome) return;
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Cities", href: "/movers" },
    { name: "Services", href: "/services" },
    { name: "Guides", href: "/guides" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Get a Quote", href: "/get-a-quote" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur shadow-md py-2" : "bg-transparent py-3 md:py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between min-h-[52px] md:min-h-[60px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 md:h-10 md:w-10">
              <Image 
                src={isScrolled ? "/logo.svg" : "/logo-white.svg"} 
                alt="Lugvia Movers" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className={`text-xl md:text-2xl font-bold ${isScrolled ? "text-slate-900" : "text-white"}`}>
              Lugvia Movers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                  pathname === link.href 
                    ? "text-blue-500" 
                    : isScrolled ? "text-slate-700" : "text-white/90"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4" />

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-slate-900" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-slate-900" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t animate-in slide-in-from-top-5">
          <div className="container mx-auto px-4 py-4 max-h-[75vh] overflow-auto flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium py-3 border-b border-slate-100 ${
                  pathname === link.href ? "text-blue-600" : "text-slate-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <div className="text-xs text-slate-500">Quick links</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
