import React from 'react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/plans';
import { ReviewyStarMarker, ReviewyNfcGlyph, ReviewyNfcWatermark } from './ReviewyBrandElements';
import { InteractiveGlow } from './InteractiveGlow';
import { Instagram, ArrowUpRight } from 'lucide-react';

export const FinalCta: React.FC = () => {
  return (
    <section id="cta-final" className="py-20 md:py-28 bg-[#0B1F45] relative overflow-hidden">
      {/* Subtle cursor-following radial glow (Item 5) */}
      <InteractiveGlow color="rgba(7, 232, 252, 0.07)" size={750} />

      {/* Background glowing radiant accents and watermark */}
      <ReviewyNfcWatermark className="-top-12 -left-12 w-96 h-96" opacity={0.03} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#29D6F0]/15 via-[#F4C430]/10 to-[#29D6F0]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-b from-[#0E2756] to-[#071530] border-2 border-[#29D6F0]/40 rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-2xl shadow-black/50 relative overflow-hidden">
          {/* Brand Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#112A5C] border border-[#29D6F0]/40 text-[#29D6F0] text-xs sm:text-sm font-semibold mb-6">
            <ReviewyNfcGlyph className="w-4 h-4 text-[#29D6F0]" />
            <span>Configuração rápida · Pronto para uso em 2 minutos</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-['Poppins'] max-w-3xl mx-auto leading-tight">
            Comece a receber avaliações{' '}
            <span className="text-[#F4C430]">5 estrelas</span> no Google ainda esta semana.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Seus clientes satisfeitos estão prontos para falar bem de você. Basta dar a eles um caminho sem esforço.
            Fale conosco diretamente pelo Instagram e receba suas placas gravadas e prontas.
          </p>

          {/* Big Instagram CTA button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="final-cta-instagram-button"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-extrabold rounded-full bg-[#29D6F0] text-[#071530] hover:bg-[#4fe1f7] transition-all duration-200 shadow-xl shadow-[#29D6F0]/30 hover:scale-105 active:scale-100"
            >
              <Instagram className="w-6 h-6 transition-transform group-hover:scale-110" />
              <span>Pedir no Instagram</span>
              <span className="bg-[#071530]/15 px-2.5 py-0.5 rounded-full text-xs font-bold">
                {INSTAGRAM_HANDLE}
              </span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          {/* Guarantee bullet points with ReviewyStarMarker */}
          <div className="mt-8 pt-6 border-t border-[#1E4080] flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <ReviewyStarMarker size="sm" />
              <span>Sem aplicativo necessário</span>
            </div>
            <div className="flex items-center gap-2">
              <ReviewyStarMarker size="sm" color="#F4C430" />
              <span className="text-white font-semibold">Sem mensalidade — pagamento único</span>
            </div>
            <div className="flex items-center gap-2">
              <ReviewyStarMarker size="sm" />
              <span>NFC + QR Code de fallback</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

