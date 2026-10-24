import React from 'react';
import { ReviewyLogo } from './ReviewyLogo';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/plans';
import { Instagram, ArrowUp, Play } from 'lucide-react';

interface FooterProps {
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'O Problema', href: '#o-problema' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Vantagens', href: '#por-que-funciona' },
    { label: 'Produtos', href: '#planos' },
    { label: 'Dúvidas Frequentes', href: '#faq' },
  ];

  return (
    <footer className="bg-[#050E21] border-t border-[#1E4080]/50 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <ReviewyLogo size="md" showStars={true} />
            <p className="mt-3 text-xs text-slate-400 max-w-xs">
              Placas NFC inteligentes para transformar clientes satisfeitos em avaliações 5 estrelas no Google.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#29D6F0] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Official Contact */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
              Contato Oficial
            </span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-[#29D6F0] font-semibold transition-colors bg-[#112A5C]/50 px-4 py-2 rounded-full border border-[#1E4080]"
            >
              <Instagram className="w-4 h-4 text-[#29D6F0]" />
              <span>{INSTAGRAM_HANDLE}</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Reviewy. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4">
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="hover:text-[#29D6F0] flex items-center gap-1 transition-colors"
                title="Rever animação de entrada oficial"
              >
                <Play className="w-3 h-3" />
                <span>Rever animação de entrada</span>
              </button>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1 transition-colors ml-2"
              aria-label="Voltar ao topo"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
