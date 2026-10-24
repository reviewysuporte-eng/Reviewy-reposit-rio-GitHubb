import React from 'react';
import { PRODUCTS_DATA, PRODUCT_KITS_DATA, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/plans';
import { ReviewyStarMarker, ReviewyNfcGlyph, ReviewyNfcWatermark } from './ReviewyBrandElements';
import { ReviewyLogo } from './ReviewyLogo';
import { TiltCard } from './TiltCard';
import { InteractiveGlow } from './InteractiveGlow';
import { Instagram, ArrowUpRight, Shield, QrCode, Sparkles, Check, Layers } from 'lucide-react';

/**
 * ============================================================================
 * SEÇÃO DE PRODUTOS REVIEWY (PLACA ADESIVA & PLACA DE BALCÃO + KITS ECONÔMICOS)
 * ============================================================================
 * NOTA PARA DESENVOLVEDORES / MANUTENÇÃO:
 * Os preços exibidos nesta seção e em `src/data/plans.ts` são PREÇOS DE LANÇAMENTO
 * e podem ser facilmente alterados no arquivo central de dados (`src/data/plans.ts`).
 * 
 * Estrutura:
 * - Produtos de linha: Placa Adesiva Reviewy (R$ 99) e Placa de Balcão Reviewy (R$ 149)
 * - Kits: Kit 2 Placas Adesivas (R$ 160), Kit Combo (R$ 199 - Mais popular), Kit 2 Placas de Balcão (R$ 239)
 * ============================================================================
 */
export const PricingSection: React.FC = () => {
  return (
    <section id="planos" className="py-20 md:py-28 bg-[#081736] relative overflow-hidden">
      {/* Subtle cursor-following radial glow */}
      <InteractiveGlow color="rgba(7, 232, 252, 0.06)" size={700} />

      {/* Subtle brand watermarks */}
      <ReviewyNfcWatermark className="-top-10 -right-10 w-96 h-96" opacity={0.03} />
      <ReviewyNfcWatermark className="bottom-0 left-0 w-80 h-80 rotate-180" opacity={0.025} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#112A5C] border border-[#29D6F0]/30 text-[#29D6F0] text-xs font-semibold uppercase tracking-wider mb-4">
            <ReviewyNfcGlyph className="w-3.5 h-3.5" />
            <span>Formatos Físicos Reviewy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-['Poppins']">
            Escolha o formato ideal para o seu ponto de contato
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Sem mensalidades, sem taxas recorrentes. Pagamento único: você adquire a placa física gravada e o resultado é 100% seu.
          </p>
        </div>

        {/* 2 Primary Product Cards Grid with Subtle 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch mb-20">
          {PRODUCTS_DATA.map((product) => {
            const isAdhesive = product.formatType === 'adhesive';

            return (
              <TiltCard
                key={product.id}
                id={`card-product-${product.id}`}
                maxTilt={6}
                className="relative rounded-3xl p-7 sm:p-9 flex flex-col justify-between bg-[#0B1F45] border-2 border-[#1E4080] hover:border-[#29D6F0]/70 shadow-2xl shadow-black/40 group cursor-default transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Badge & Dimension Pill */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider bg-[#112A5C] text-[#29D6F0] border border-[#29D6F0]/40">
                      <ReviewyNfcGlyph className="w-3.5 h-3.5" />
                      {product.badge}
                    </span>

                    <span className="text-[11px] font-mono text-slate-300 bg-[#071530] px-2.5 py-1 rounded-md border border-[#1E4080]">
                      {product.dimensions}
                    </span>
                  </div>

                  {/* Product Title & Narrative Description */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Poppins'] tracking-tight mb-3">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 min-h-[48px]">
                    {product.description}
                  </p>

                  {/* Bespoke Physical Mockup Graphic */}
                  <div className="mb-6 p-6 rounded-2xl bg-[#071530] border border-[#1E4080] flex items-center justify-center relative overflow-hidden min-h-[220px]">
                    {/* Atmospheric Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#29D6F0]/5 to-transparent pointer-events-none" />

                    {isAdhesive ? (
                      /* Mockup: Placa Adesiva Reviewy (9 × 12cm) */
                      <div className="w-48 h-56 rounded-2xl p-4 bg-gradient-to-br from-[#0C2454] via-[#081838] to-[#040C1D] border-2 border-[#29D6F0]/70 shadow-xl relative flex flex-col justify-between group-hover:border-[#29D6F0] transition-colors">
                        {/* Removable Adhesive corner peel indicator */}
                        <div className="absolute -top-[1px] -right-[1px] w-8 h-8 overflow-hidden rounded-tr-2xl pointer-events-none">
                          <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#29D6F0]/40 via-[#1E4080] to-transparent" />
                        </div>

                        {/* Top Header inside plate */}
                        <div className="flex items-center justify-between">
                          <ReviewyLogo size="sm" showStars={false} />
                          <div className="px-2 py-0.5 rounded bg-[#29D6F0]/15 text-[#29D6F0] text-[9px] font-mono font-bold border border-[#29D6F0]/30">
                            9 × 12cm
                          </div>
                        </div>

                        {/* Main Interaction visual */}
                        <div className="text-center py-1">
                          <div className="w-10 h-10 mx-auto rounded-full bg-[#112A5C] border border-[#29D6F0]/50 flex items-center justify-center text-[#29D6F0] mb-2 shadow-[0_0_12px_rgba(41,214,240,0.25)]">
                            <ReviewyNfcGlyph className="w-5 h-5 text-[#29D6F0]" />
                          </div>

                          <div className="flex justify-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <svg
                                key={s}
                                viewBox="0 0 24 24"
                                fill={s === 3 ? '#00C9F0' : '#F8BA15'}
                                stroke={s === 3 ? '#00C9F0' : '#F8BA15'}
                                strokeWidth="1.2"
                                strokeLinejoin="round"
                                className={`w-3.5 h-3.5 ${s === 3 ? 'w-4 h-4 -translate-y-[1px]' : ''}`}
                              >
                                <path d="M 12 2.5 L 14.9 8.6 L 21.6 9.4 L 16.7 14.1 L 18 20.8 L 12 17.5 L 6 20.8 L 7.3 14.1 L 2.4 9.4 L 9.1 8.6 Z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-[11px] text-white font-bold block leading-tight">
                            Avalie em 1 toque
                          </span>
                          <span className="text-[9px] text-slate-300 block mt-0.5">
                            Aproxime seu celular aqui
                          </span>
                        </div>

                        {/* Bottom Tag */}
                        <div className="flex items-center justify-between text-[9px] text-slate-300 border-t border-white/10 pt-1.5">
                          <span className="text-[#29D6F0] font-medium flex items-center gap-1">
                            <Check className="w-2.5 h-2.5 text-[#29D6F0]" /> Adesivo sem resíduo
                          </span>
                          <span className="flex items-center gap-1 text-slate-300">
                            <QrCode className="w-2.5 h-2.5 text-[#F4C430]" /> + QR Code
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Mockup: Placa de Balcão Reviewy (10 × 15cm A6 com base acrílica) */
                      <div className="flex flex-col items-center">
                        <div className="w-48 h-56 rounded-t-xl p-3.5 bg-gradient-to-b from-[#0F2F6B] via-[#0B214C] to-[#071530] border-t-2 border-x-2 border-[#29D6F0]/70 shadow-2xl relative flex flex-col justify-between group-hover:border-[#29D6F0] transition-colors">
                          {/* Acrylic slant effect reflection */}
                          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none rounded-tr-xl" />
                          
                          <div className="flex items-center justify-between relative z-10">
                            <ReviewyLogo size="sm" showStars={false} />
                            <div className="px-2 py-0.5 rounded bg-[#29D6F0]/20 text-[#29D6F0] text-[9px] font-mono font-bold border border-[#29D6F0]/30">
                              10 × 15cm (A6)
                            </div>
                          </div>

                          <div className="text-center my-auto relative z-10">
                            <div className="w-10 h-10 mx-auto rounded-full bg-[#112A5C] border border-[#29D6F0]/50 flex items-center justify-center text-[#29D6F0] mb-2 shadow-[0_0_12px_rgba(41,214,240,0.25)]">
                              <ReviewyNfcGlyph className="w-5 h-5 text-[#29D6F0]" />
                            </div>

                            <div className="flex justify-center gap-1 mb-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <svg
                                  key={s}
                                  viewBox="0 0 24 24"
                                  fill={s === 3 ? '#00C9F0' : '#F8BA15'}
                                  stroke={s === 3 ? '#00C9F0' : '#F8BA15'}
                                  strokeWidth="1.2"
                                  strokeLinejoin="round"
                                  className={`w-3.5 h-3.5 ${s === 3 ? 'w-4 h-4 -translate-y-[1px]' : ''}`}
                                >
                                  <path d="M 12 2.5 L 14.9 8.6 L 21.6 9.4 L 16.7 14.1 L 18 20.8 L 12 17.5 L 6 20.8 L 7.3 14.1 L 2.4 9.4 L 9.1 8.6 Z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-white font-bold block leading-tight">
                              Aproxime o celular aqui
                            </span>
                            <span className="text-[10px] text-[#29D6F0] font-medium block mt-0.5">
                              ou aponte a câmera pro QR Code
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[9px] text-slate-300 border-t border-white/10 pt-1 relative z-10">
                            <span className="text-[#F4C430] font-semibold">Fica em pé sozinha</span>
                            <span className="text-slate-300">Sem instalar app</span>
                          </div>
                        </div>

                        {/* Sturdy acrylic transparent base stand */}
                        <div className="w-52 h-4 rounded-b-md bg-gradient-to-r from-[#29D6F0]/50 via-white/50 to-[#29D6F0]/50 border-b-2 border-x border-[#29D6F0]/60 shadow-lg relative flex items-center justify-center">
                          <span className="text-[8px] font-bold text-[#071530] uppercase tracking-widest">Base Acrílico Cristal</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Technical Specifications with Brand Star Markers */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Especificações Técnicas:
                    </span>
                    {product.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                        <ReviewyStarMarker size="sm" className="mt-0.5" />
                        <div>
                          <strong className="text-white font-semibold">{spec.label}: </strong>
                          <span className="text-slate-300">{spec.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Section */}
                <div className="pt-6 border-t border-[#1E4080]">
                  {/* Price Tag with 'Sem Mensalidade' Highlighting */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-5">
                    <div>
                      {/* Comentário no código: Preço de lançamento, fácil de editar em src/data/plans.ts */}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-semibold text-slate-400">R$</span>
                        <span className="text-4xl sm:text-5xl font-black text-white font-['Poppins']">
                          {product.price}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        {product.paymentNotice}
                      </span>
                    </div>

                    {/* Strong Value Argument */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#29D6F0]/10 border border-[#29D6F0]/30 text-[#29D6F0] text-xs font-bold w-fit mt-2 sm:mt-0">
                      <Shield className="w-3 h-3" />
                      <span>Sem mensalidade</span>
                    </div>
                  </div>

                  {/* Primary CTA Button: "Quero um" */}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`btn-quero-um-${product.id}`}
                    className="w-full py-4 px-6 rounded-full font-bold text-base text-center flex items-center justify-center gap-3 transition-all duration-200 bg-[#29D6F0] text-[#071530] hover:bg-[#4fe1f7] shadow-lg shadow-[#29D6F0]/20 hover:shadow-xl hover:shadow-[#29D6F0]/30 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Instagram className="w-5 h-5 text-[#071530]" />
                    <span>Quero a minha placa</span>
                    <ArrowUpRight className="w-4 h-4 text-[#071530]" />
                  </a>

                  <span className="text-[11px] text-center text-slate-400 block mt-2.5">
                    Envie uma mensagem no Direct do Instagram ({INSTAGRAM_HANDLE})
                  </span>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* ==================================================================== */}
        {/* KITS ECONÔMICOS (MOSTRADOS COMO OPÇÃO ABAIXO DOS CARDS DE PRODUTO) */}
        {/* ==================================================================== */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#112A5C] border border-[#29D6F0]/30 text-[#29D6F0] text-xs font-semibold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Opções em Kits</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Poppins']">
              Kits com Desconto para Mais Pontos de Contato
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Precisa de placas para mais mesas, caixas ou filiais? Economize garantindo seu kit com pagamento único e sem mensalidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {PRODUCT_KITS_DATA.map((kit) => {
              const isCombo = kit.isPopular;

              return (
                <div
                  key={kit.id}
                  id={`card-kit-${kit.id}`}
                  className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                    isCombo
                      ? 'bg-gradient-to-b from-[#112D66] via-[#0B214C] to-[#071738] border-2 border-[#29D6F0] shadow-2xl shadow-[#29D6F0]/20 md:-translate-y-2'
                      : 'bg-[#0B1F45] border-2 border-[#1E4080] hover:border-[#29D6F0]/50 shadow-xl shadow-black/30'
                  }`}
                >
                  {/* Highlight Badge for Kit Combo */}
                  {isCombo && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#29D6F0] to-[#F4C430] text-[#071530] shadow-md shadow-black/40">
                        <Sparkles className="w-3.5 h-3.5 text-[#071530]" />
                        {kit.badge || 'Mais popular'}
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Kit Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#29D6F0] bg-[#112A5C] px-2.5 py-1 rounded-md border border-[#29D6F0]/30">
                        Kit Econômico
                      </span>
                      {/* Tag de Economia */}
                      <span className="text-xs font-extrabold text-[#F4C430] bg-[#F4C430]/10 border border-[#F4C430]/30 px-2.5 py-1 rounded-md">
                        Economia R$ {kit.savings}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white font-['Poppins'] tracking-tight mb-2">
                      {kit.name}
                    </h4>

                    {/* Conteúdo do Kit */}
                    <div className="mb-4 p-3 rounded-xl bg-[#071530] border border-[#1E4080] text-xs">
                      <span className="font-semibold text-slate-300 block mb-1">
                        Conteúdo do Kit:
                      </span>
                      <div className="flex items-center gap-2 text-white font-medium">
                        <ReviewyStarMarker size="sm" />
                        <span>{kit.itemsSummary}</span>
                      </div>
                    </div>

                    {kit.description && (
                      <p className="text-xs text-slate-300 leading-relaxed mb-6">
                        {kit.description}
                      </p>
                    )}
                  </div>

                  {/* Preço e Botão */}
                  <div className="pt-5 border-t border-[#1E4080]">
                    {/* Comentário: Preços de lançamento para kits */}
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-semibold text-slate-400">R$</span>
                        <span className="text-3xl font-black text-white font-['Poppins']">
                          {kit.price}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#29D6F0] bg-[#29D6F0]/10 px-2 py-0.5 rounded border border-[#29D6F0]/25">
                        <Shield className="w-2.5 h-2.5" />
                        <span>Sem mensalidade</span>
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400 block mb-4">
                      {kit.paymentNotice}
                    </span>

                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`btn-kit-${kit.id}`}
                      className={`w-full py-3 px-4 rounded-full font-bold text-sm text-center flex items-center justify-center gap-2 transition-all duration-200 ${
                        isCombo
                          ? 'bg-[#29D6F0] text-[#071530] hover:bg-[#4fe1f7] shadow-lg shadow-[#29D6F0]/25 hover:-translate-y-0.5'
                          : 'bg-[#112A5C] hover:bg-[#163773] text-white border border-[#29D6F0]/40 hover:border-[#29D6F0]'
                      }`}
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Pedir {kit.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tailored Custom Orders Advice */}
        <div className="text-center mt-14 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto flex items-center justify-center gap-2">
          <span>Precisa de uma quantidade maior para rede ou franquia?</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#29D6F0] hover:underline font-semibold"
          >
            Fale conosco no Instagram.
          </a>
        </div>
      </div>
    </section>
  );
};
