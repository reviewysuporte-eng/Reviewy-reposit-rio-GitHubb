import React, { useState } from 'react';
import { Star, TrendingUp, Users, Cpu, Calculator, ArrowRight } from 'lucide-react';
import { ReviewyStarMarker, ReviewyNfcGlyph, ReviewyNfcWatermark } from './ReviewyBrandElements';
import { InteractiveGlow } from './InteractiveGlow';
import { INSTAGRAM_URL } from '../data/plans';

export const WhyItWorks: React.FC = () => {
  const [customersPerDay, setCustomersPerDay] = useState<number>(40);

  // Estimativas baseadas em adesão realista com Reviewy no balcão/mesa (~18% tocam e avaliam)
  const monthlyReviews = Math.round(customersPerDay * 30 * 0.18);
  const yearlyReviews = monthlyReviews * 12;

  const cards = [
    {
      title: 'Mais avaliações 5 estrelas',
      description:
        'Multiplique o volume de comentários positivos reais de clientes que já estão na sua loja, neutralizando eventuais avaliações isoladas.',
      icon: Star,
      accent: 'text-[#F4C430]',
      highlight: 'Volume Constante',
    },
    {
      title: 'Topo do Google Maps',
      description:
        'O algoritmo do Google prioriza negócios com avaliações recentes, frequentes e consistentes na sua região. Mais estrelas = mais destaque na busca local.',
      icon: TrendingUp,
      accent: 'text-[#29D6F0]',
      highlight: 'Ranqueamento Local',
    },
    {
      title: 'Zero trabalho para a equipe',
      description:
        'Seus atendentes não precisam pedir favores nem dar instruções complexas. Basta posicionar a placa no balcão ou na mesa: "Pode encostar aqui?".',
      icon: Users,
      accent: 'text-emerald-400',
      highlight: 'Sem Constrangimento',
    },
    {
      title: 'Sem energia, fios ou internet',
      description:
        'A tecnologia opera por indução de campo (NFC). Você recebe, coloca no balcão e dura anos. Sem tomadas, sem recarga e sem manutenção técnica.',
      icon: Cpu,
      accent: 'text-[#29D6F0]',
      highlight: '100% Autônomo',
    },
  ];

  return (
    <section id="por-que-funciona" className="py-20 md:py-28 bg-[#071530] border-t border-[#1E4080]/40 relative overflow-hidden">
      {/* Subtle cursor-following radial glow (Item 5) */}
      <InteractiveGlow color="rgba(7, 232, 252, 0.05)" size={700} />

      {/* Subtle brand watermark */}
      <ReviewyNfcWatermark className="top-1/4 right-0 w-80 h-80" opacity={0.025} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#112A5C] border border-[#29D6F0]/30 text-[#29D6F0] text-xs font-semibold uppercase tracking-wider mb-4">
            <ReviewyNfcGlyph className="w-3.5 h-3.5" />
            <span>Resultados Comprovados</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-['Poppins']">
            Por que o Reviewy funciona tão bem?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Eliminar o atrito é o único segredo para transformar clientes felizes em promotores ativos no Google.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#0B1F45] border border-[#1E4080] rounded-2xl p-6 relative flex flex-col justify-between transition-all duration-300 hover:border-[#29D6F0]/50 hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#112A5C] border border-[#1E4080] flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${card.accent}`} />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-[#071530] px-2.5 py-0.5 rounded-md border border-white/5">
                      {card.highlight}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-['Poppins']">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Impact Estimator for Local Business Owners */}
        <div className="bg-gradient-to-r from-[#0B1F45] via-[#0E2756] to-[#0B1F45] border border-[#29D6F0]/30 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Input slider */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#29D6F0]/10 text-[#29D6F0] text-xs font-semibold">
                <Calculator className="w-3.5 h-3.5" />
                <span>Simulador de Potencial</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Poppins']">
                Quantos clientes você atende por dia?
              </h3>
              <p className="text-sm text-slate-300">
                Arraste para estimar quantas novas avaliações 5 estrelas você pode acumular todo mês no Google.
              </p>

              <div className="pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-400 font-medium">Fluxo diário de clientes:</span>
                  <span className="text-xl font-bold text-[#29D6F0] font-['Poppins']">
                    {customersPerDay} clientes/dia
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={customersPerDay}
                  onChange={(e) => setCustomersPerDay(Number(e.target.value))}
                  className="w-full h-2 bg-[#071530] rounded-lg appearance-none cursor-pointer accent-[#29D6F0]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>10 (pequeno fluxo)</span>
                  <span>100 (médio)</span>
                  <span>200+ (alto giro)</span>
                </div>
              </div>
            </div>

            {/* Right: Calculated Outcome */}
            <div className="lg:col-span-6 bg-[#071530] border border-[#1E4080] rounded-2xl p-6 sm:p-7">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-4">
                Estimativa conservadora com Reviewy:
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-[#0B1F45] p-4 rounded-xl border border-[#1E4080]">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#F4C430] font-['Poppins']">
                    +{monthlyReviews}
                  </div>
                  <div className="text-xs font-medium text-slate-300 mt-1">
                    Novas avaliações / mês
                  </div>
                </div>

                <div className="bg-[#0B1F45] p-4 rounded-xl border border-[#1E4080]">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#29D6F0] font-['Poppins']">
                    +{yearlyReviews}
                  </div>
                  <div className="text-xs font-medium text-slate-300 mt-1">
                    Avaliações no 1º ano
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ReviewyStarMarker size="sm" />
                  <span>Seu negócio passa na frente de concorrentes da região no Google Maps</span>
                </div>
                <div className="flex items-center gap-2">
                  <ReviewyStarMarker size="sm" color="#F4C430" />
                  <span>Aumenta a confiança de turistas e novos clientes que não conhecem seu espaço</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#29D6F0] hover:text-[#4fe1f7] transition-colors"
                >
                  <span>Fazer pedido via Instagram</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

