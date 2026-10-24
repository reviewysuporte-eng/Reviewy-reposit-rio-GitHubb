import React, { useState, useEffect, useRef } from 'react';
import { ReviewyStarMarker, ReviewyNfcGlyph, ReviewyNfcWatermark } from './ReviewyBrandElements';
import { InteractiveGlow } from './InteractiveGlow';
import { FileText, Check, X, Clock, AlertCircle, Sparkles } from 'lucide-react';

/**
 * DADO REAL DA PESQUISA HARMO + RECLAME AQUI 2025 (1.591 respondentes)
 * 82,6% dos consumidores consultam avaliações no Google antes de comprar ou visitar.
 * Contador animado de 0 até 82,6% em ~1,2s ativado por IntersectionObserver (Item 3).
 */
const AnimatedStatCounter: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0,0%');
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          const target = 82.6;
          const duration = 1200; // ~1,2s
          const startTime = performance.now();

          const updateCounter = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Curva suave ease-out cubic-bezier(0.16, 1, 0.3, 1)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            if (progress < 1) {
              setDisplayValue(`${current.toFixed(1).replace('.', ',')}%`);
              requestAnimationFrame(updateCounter);
            } else {
              setDisplayValue('82,6%');
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { 
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-6xl sm:text-7xl lg:text-8xl font-black text-white font-['Poppins'] tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#29D6F0] tabular-nums select-none"
    >
      {displayValue}
    </div>
  );
};

export const ProblemSection: React.FC = () => {
  return (
    <section id="o-problema" className="py-20 md:py-28 bg-[#071530] border-y border-[#1E4080]/40 relative overflow-hidden">
      {/* Subtle cursor-following radial glow (Item 5) */}
      <InteractiveGlow color="rgba(7, 232, 252, 0.05)" size={700} />

      {/* Subtle brand NFC watermark */}
      <ReviewyNfcWatermark className="-top-12 -left-12 w-96 h-96" opacity={0.03} />
      <ReviewyNfcWatermark className="bottom-10 right-0 w-80 h-80" opacity={0.025} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* BLOCO DE DESTAQUE: PROVA SOCIAL COM DADO REAL DE PESQUISA (HARMO 2025)   */}
        {/* ========================================================================= */}
        <div className="mb-16 rounded-3xl bg-gradient-to-br from-[#0B1F45] via-[#081B3E] to-[#06142E] border border-[#29D6F0]/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#29D6F0]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Massive Stat Column */}
            <div className="lg:col-span-5 flex flex-col items-start justify-center border-b lg:border-b-0 lg:border-r border-[#1E4080]/70 pb-8 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#29D6F0] mb-3">
                <FileText className="w-4 h-4 text-[#29D6F0]" />
                <span>Dado Real de Pesquisa</span>
              </div>

              {/* Huge Number with Animated Counter (Item 3) */}
              <AnimatedStatCounter />

              {/* Supporting small text directly tied to the number */}
              <p className="mt-3 text-sm sm:text-base font-semibold text-slate-200 leading-snug">
                dos consumidores decidem onde comprar ou consumir guiados pelas avaliações do Google.
              </p>

              {/* Citation badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#112A5C] border border-[#1E4080] text-[11px] font-medium text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4C430]" />
                <span>Pesquisa Harmo + Reclame AQUI 2025 · 1.591 respondentes</span>
              </div>
            </div>

            {/* Context & Meaning for the Business Owner */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4 lg:pl-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Poppins'] leading-snug">
                Se você não pede no momento certo, quem avalia é só quem teve algum problema.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Mais de 8 em cada 10 potenciais clientes estão no Google Maps agora comparando sua nota com a do seu concorrente da rua ao lado. O cliente que adorou o seu atendimento sai feliz, mas esquece de avaliar assim que vira a esquina. Já o insatisfeito não esquece.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <ReviewyStarMarker size="sm" /> 82,6% leem avaliações antes da visita
                </span>
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <ReviewyStarMarker size="sm" color="#F4C430" /> Cada estrela extra gera aumento de fluxo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* OS 3 PROBLEMAS REAIS DO DIA A DIA                                         */}
        {/* ========================================================================= */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#29D6F0] text-xs font-bold uppercase tracking-wider block mb-2">
              Os gargalos da reputação no Google
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Poppins'] tracking-tight">
              Por que sua nota não reflete a qualidade real do seu atendimento?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Problema 1: Cliente satisfeito esquece */}
            <div className="bg-[#0B1F45] border border-[#1E4080] rounded-2xl p-6 flex flex-col justify-between hover:border-[#29D6F0]/40 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#112A5C] border border-[#1E4080] flex items-center justify-center text-[#29D6F0] mb-4">
                  <Clock className="w-5 h-5 text-[#29D6F0]" />
                </div>
                <h4 className="text-base font-bold text-white font-['Poppins'] mb-2">
                  O cliente satisfeito esquece
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ele elogia sinceramente, promete avaliar quando chegar em casa, mas em 15 minutos a rotina e as mensagens no celular engolem a promessa. O Google nunca fica sabendo que ele amou.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 font-medium">
                Mais de 90% das promessas verbais não viram avaliação.
              </div>
            </div>

            {/* Problema 2: Cliente insatisfeito age sozinho (incorporado como problema) */}
            <div className="bg-[#0B1F45] border border-rose-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/60 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                </div>
                <h4 className="text-base font-bold text-white font-['Poppins'] mb-2">
                  O cliente insatisfeito tem iniciativa própria
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A frustração dá foco. Se teve qualquer atraso ou incômodo pontual, ele abre o Maps por conta própria, digita o nome da loja letra por letra e gasta 10 minutos publicando 1 estrela sem ninguém pedir.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-500/20 text-xs text-rose-300 font-medium">
                Sem volume de 5 estrelas para diluir, 1 nota baixa derruba sua média.
              </div>
            </div>

            {/* Problema 3: Atrito dos métodos tradicionais */}
            <div className="bg-[#0B1F45] border border-[#1E4080] rounded-2xl p-6 flex flex-col justify-between hover:border-[#29D6F0]/40 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#112A5C] border border-[#1E4080] flex items-center justify-center text-[#F4C430] mb-4">
                  <X className="w-5 h-5 text-[#F4C430]" />
                </div>
                <h4 className="text-base font-bold text-white font-['Poppins'] mb-2">
                  Métodos antigos têm atrito demais
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Placas de papel amassadas ou QR codes simples exigem abrir a câmera, ajustar o foco, conectar a internet e procurar a seção de avaliações. Cada etapa extra derruba a conversão.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 font-medium">
                Menos de 2% dos clientes concluem avaliações por QR tradicional.
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TABELA DE COMPARAÇÃO: A FORMA TRADICIONAL VS COM A REVIEWY                */}
        {/* ========================================================================= */}
        <div className="bg-[#0B1F45] border border-[#1E4080] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#112A5C] border border-[#29D6F0]/30 text-[#29D6F0] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#29D6F0]" />
              <span>Comparativo Direto</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-['Poppins']">
              A forma tradicional vs. Com a Reviewy
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Veja a diferença prática entre depender da boa vontade posterior e facilitar a avaliação no momento certo.
            </p>
          </div>

          {/* Versão Desktop / Tablet: Tabela estruturada */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E4080]">
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/3">
                    Critério
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-rose-400 w-1/3 bg-rose-950/20 rounded-t-xl">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-400" />
                      <span>Método Tradicional (Papel / QR Simples)</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#29D6F0] w-1/3 bg-[#0E2756]/80 rounded-t-xl border-t border-x border-[#29D6F0]/40">
                    <div className="flex items-center gap-2">
                      <ReviewyNfcGlyph className="w-4 h-4 text-[#29D6F0]" />
                      <span className="text-white font-extrabold">Com a Reviewy (NFC + QR Direto)</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E4080]/60 text-sm">
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">
                    Como o cliente acessa
                  </td>
                  <td className="py-4 px-4 text-slate-300 bg-rose-950/10">
                    Abre câmera, foca, lida com iluminação ruim e clica em link que abre navegador genérico.
                  </td>
                  <td className="py-4 px-4 text-slate-200 bg-[#0E2756]/50 font-medium border-x border-[#29D6F0]/30">
                    <span className="text-white font-semibold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#29D6F0] shrink-0" />
                      Apenas encosta o celular. A caixa oficial de 5 estrelas do Google abre direto na tela.
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-semibold text-white">
                    Cliente satisfeito
                  </td>
                  <td className="py-4 px-4 text-slate-300 bg-rose-950/10">
                    Promete avaliar em casa, mas esquece em menos de 15 minutos na volta à rotina.
                  </td>
                  <td className="py-4 px-4 text-slate-200 bg-[#0E2756]/50 font-medium border-x border-[#29D6F0]/30">
                    <span className="text-white font-semibold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#29D6F0] shrink-0" />
                      Avalia em 5 a 10 segundos no balcão ou na mesa, enquanto ainda está no auge da satisfação.
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-semibold text-white">
                    Cliente insatisfeito
                  </td>
                  <td className="py-4 px-4 text-slate-300 bg-rose-950/10">
                    Pesquisa ativamente para reclamar. A nota 1 estrela fica isolada e derruba sua média.
                  </td>
                  <td className="py-4 px-4 text-slate-200 bg-[#0E2756]/50 font-medium border-x border-[#29D6F0]/30">
                    <span className="text-white font-semibold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#29D6F0] shrink-0" />
                      É diluído por dezenas de avaliações 5 estrelas semanais. Sua reputação permanece blindada.
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-semibold text-white">
                    Taxa média de conversão
                  </td>
                  <td className="py-4 px-4 text-rose-300 bg-rose-950/10 font-semibold">
                    Menos de 2% dos clientes concluem
                  </td>
                  <td className="py-4 px-4 text-[#29D6F0] bg-[#0E2756]/50 font-bold border-x border-[#29D6F0]/30">
                    <span className="text-[#29D6F0] flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#29D6F0] shrink-0" />
                      Mais de 40% dos clientes abordados avaliam
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-semibold text-white">
                    Custo e Modelo
                  </td>
                  <td className="py-4 px-4 text-slate-300 bg-rose-950/10 rounded-b-xl">
                    Mensalidades de plataformas complexas ou reimpressão constante de papel.
                  </td>
                  <td className="py-4 px-4 text-slate-200 bg-[#0E2756]/50 font-semibold border-x border-b border-[#29D6F0]/30 rounded-b-xl">
                    <span className="text-[#F4C430] flex items-center gap-1.5">
                      <ReviewyStarMarker size="sm" color="#F4C430" />
                      Pagamento único, sem mensalidade. Placa para sempre sua.
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Versão Mobile: Cards Comparativos Compactos */}
          <div className="md:hidden space-y-6">
            {/* O Tradicional */}
            <div className="bg-[#071530] border border-rose-900/40 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-rose-900/30 text-rose-400 font-bold text-sm">
                <X className="w-4 h-4 text-rose-400" />
                <span>Método Tradicional (Papel / QR Simples)</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Acesso:</strong> Exige abrir câmera, focar e carregar links em navegadores externos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Satisfeito:</strong> Promete avaliar depois e esquece no caminho de volta.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Insatisfeito:</strong> Reclama ativamente e a nota 1 estrela mancha o perfil sem contraponto.</span>
                </li>
                <li className="flex items-start gap-2 text-rose-300 font-medium">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Resultado:</strong> Menos de 2% de conversão real.</span>
                </li>
              </ul>
            </div>

            {/* Com a Reviewy */}
            <div className="bg-[#0E2756] border-2 border-[#29D6F0]/50 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#29D6F0]/30 text-white font-bold text-sm">
                <ReviewyNfcGlyph className="w-4 h-4 text-[#29D6F0]" />
                <span>Com a Reviewy (NFC + QR Direto)</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#29D6F0] shrink-0 mt-0.5" />
                  <span><strong>Acesso:</strong> Só encostar o celular. Abre a tela oficial de 5 estrelas na hora.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#29D6F0] shrink-0 mt-0.5" />
                  <span><strong>Satisfeito:</strong> Avalia no balcão ou na mesa em 10 segundos, no momento do pagamento.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#29D6F0] shrink-0 mt-0.5" />
                  <span><strong>Insatisfeito:</strong> Diluído por dezenas de 5 estrelas novas toda semana.</span>
                </li>
                <li className="flex items-start gap-2 text-[#29D6F0] font-bold">
                  <Check className="w-4 h-4 text-[#29D6F0] shrink-0 mt-0.5" />
                  <span><strong>Resultado:</strong> Mais de 40% de adesão real, sem mensalidade.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
