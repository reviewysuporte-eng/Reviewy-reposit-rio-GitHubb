import React, { useState, useEffect } from 'react';
import { ReviewyLogo } from './ReviewyLogo';
import { ReviewyNfcGlyph } from './ReviewyBrandElements';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/plans';
import { Instagram, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'O Problema', href: '#o-problema' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Vantagens', href: '#por-que-funciona' },
    { label: 'Produtos', href: '#planos' },
    { label: 'Dúvidas', href: '#faq' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? 'bg-[#071530]/90 backdrop-blur-md border-b border-[#1E4080]/60 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with NFC Signal Micro-Interaction (Item 7) */}
        <a
          href="#"
          id="navbar-logo-link"
          className="flex items-center gap-2.5 group select-none transition-opacity hover:opacity-95"
          aria-label="Reviewy - Página inicial"
        >
          <ReviewyLogo size="sm" showStars={true} />
          <div
            title="Tecnologia NFC ativa"
            className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#112A5C]/70 border border-[#29D6F0]/30 text-[#29D6F0] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[#29D6F0] group-hover:bg-[#112A5C] group-hover:shadow-[0_0_12px_rgba(7,232,252,0.35)]"
          >
            <ReviewyNfcGlyph className="w-3.5 h-3.5 nfc-breathe transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
            <span className="sr-only">Tecnologia NFC ativa</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={`nav-link-${link.href.replace('#', '')}`}
              className="transition-colors hover:text-[#29D6F0] relative py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button: Instagram CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-cta-instagram"
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-[#29D6F0] text-[#071530] hover:bg-[#4fe1f7] transition-all duration-200 shadow-md shadow-[#29D6F0]/20 hover:shadow-[#29D6F0]/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Seguir no Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-dropdown"
          className="md:hidden bg-[#071530]/95 backdrop-blur-xl border-b border-[#1E4080] px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-[#29D6F0] py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="mobile-cta-instagram"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#29D6F0] text-[#071530] font-semibold text-sm shadow-md"
              >
                <Instagram className="w-4 h-4" />
                <span>Seguir no Instagram {INSTAGRAM_HANDLE}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
