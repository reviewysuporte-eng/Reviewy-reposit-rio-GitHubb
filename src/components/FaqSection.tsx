import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faq';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/plans';
import { HelpCircle, MessageCircle, Plus } from 'lucide-react';
import { InteractiveGlow } from './InteractiveGlow';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    // Apenas uma pergunta aberta por vez (comportamento padrão de accordion)
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#071530] border-t border-[#1E4080]/40 relative overflow-hidden">
      {/* Subtle radial background glow */}
      <InteractiveGlow color="rgba(7, 232, 252, 0.05)" size={600} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#112A5C] border border-[#29D6F0]/30 text-[#29D6F0] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire suas dúvidas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-['Poppins']">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Tudo o que você precisa saber sobre as placas NFC Reviewy para o seu comércio.
          </p>
        </div>

        {/* Accordion List with Smooth grid-template-rows (Item 6) */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className={`bg-[#0B1F45] border rounded-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen
                    ? 'border-[#29D6F0]/60 shadow-lg shadow-black/20'
                    : 'border-[#1E4080] hover:border-[#29D6F0]/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-white text-base sm:text-lg focus:outline-none cursor-pointer select-none touch-manipulation active:scale-[0.99] transition-transform"
                  aria-expanded={isOpen}
                >
                  <span className="font-['Poppins'] leading-snug">{item.question}</span>

                  {/* Rotating + to × icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen
                        ? 'rotate-45 bg-[#29D6F0] text-[#071530] shadow-md shadow-[#29D6F0]/30'
                        : 'bg-[#112A5C] text-[#29D6F0] border border-[#1E4080]'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {/* Smooth CSS Grid Row Accordion Animation (0fr -> 1fr) with min-h-0 for mobile WebKit */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-[#1E4080]/50">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 bg-[#112A5C]/50 border border-[#1E4080] rounded-2xl p-6 text-center">
          <p className="text-sm text-slate-300 mb-3">
            Ainda tem alguma dúvida específica sobre o seu tipo de negócio?
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#29D6F0] hover:text-[#4fe1f7] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Mande uma mensagem no Direct do Instagram ({INSTAGRAM_HANDLE})</span>
          </a>
        </div>
      </div>
    </section>
  );
};
