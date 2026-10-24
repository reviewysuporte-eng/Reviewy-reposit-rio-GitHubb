import React, { useState, useEffect, useRef } from 'react';
import { ReviewyStarMarker, ReviewyNfcGlyph, ReviewyNfcWatermark } from './ReviewyBrandElements';
import { InteractiveGlow } from './InteractiveGlow';
import { Smartphone, ExternalLink, ShieldCheck, ArrowRight, Zap, QrCode, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  // Estágio da linha e dos passos:
  // 0: Aguardando viewport
  // 1: Passo 1 ativo (0ms)
  // 2: Linha 1->2 desenhada, Passo 2 ativo (+500ms)
  // 3: Linha 2->3 desenhada, Passo 3 ativo (+1000ms)
  const [activeStage, setActiveStage] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          observer.disconnect();

          // Sequência progressiva suave: cada passo acende conforme a linha o alcança
          setActiveStage(1);
          setTimeout(() => setActiveStage(2), 400);
          setTimeout(() => setActiveStage(3), 850);
        }
      },
      { 
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="py-20 md:py-28 bg-[#0B1F45] relative overflow-hidden"
    >
      {/* Subtle cursor-following radial glow (Item 5) */}
      <InteractiveGlow color="rgba(7, 232, 252, 0.06)" size={750} />

      {/* Subtle brand NFC watermark */}
      <ReviewyNfcWatermark className="top-1/3 -right-24 w-[420px] h-[420px]" opacity={0.035} />
      <ReviewyNfcWatermark className="-bottom-24 left-10 w-[360px] h-[360px] -rotate-12" opacity={0.025} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#112A5C] border border-[#29D6F0]/30 text-[#29D6F0] text-xs font-semibold uppercase tracking-wider mb-3">
            <ReviewyNfcGlyph className="w-3.5 h-3.5" />
            <span>Sem aplicativo · Sem cadastro · Sem atrito</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-['Poppins']">
            Como funciona na prática?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Três momentos fluidos: do balcão à visibilidade orgânica no Google Maps em menos de 30 segundos.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PROGRESSO DESENHADO CONECTANDO OS 3 PASSOS (Item 2)                       */}
        {/* Linha SVG animada via stroke-dashoffset + ativação sequencial dos passos  */}
        {/* ========================================================================= */}

        {/* --- DESKTOP VIEW (Horizontal SVG track line with sequential lighting) --- */}
        <div className="hidden lg:block relative mb-8">
          {/* SVG Connecting Track Line across the 3 step markers */}
          <div className="relative w-full mb-10 px-12">
            <svg
              className="w-full h-10 overflow-visible"
              viewBox="0 0 1000 40"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Background inactive track */}
              <line
                x1="40"
                y1="20"
                x2="960"
                y2="20"
                stroke="#1E4080"
                strokeWidth="3"
                strokeDasharray="6 6"
              />

              {/* Segment 1: from Node 1 to Node 2 */}
              <path
                d="M 40 20 L 500 20"
                stroke="#29D6F0"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 460,
                  strokeDashoffset: activeStage >= 2 ? 0 : 460,
                  transition: 'stroke-dashoffset 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Segment 2: from Node 2 to Node 3 */}
              <path
                d="M 500 20 L 960 20"
                stroke="#29D6F0"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 460,
                  strokeDashoffset: activeStage >= 3 ? 0 : 460,
                  transition: 'stroke-dashoffset 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </svg>

            {/* Step 1 Indicator Badge (Over Node 1) */}
            <div className="absolute top-1/2 left-12 -translate-y-1/2 -translate-x-1/2">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-black font-['Poppins'] text-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeStage >= 1
                    ? 'bg-[#29D6F0] text-[#071530] shadow-[0_0_20px_rgba(41,214,240,0.6)] scale-110'
                    : 'bg-[#112A5C] text-slate-400 border border-[#1E4080] scale-95'
                }`}
              >
                01
              </div>
            </div>

            {/* Step 2 Indicator Badge (Over Node 2) */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-black font-['Poppins'] text-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeStage >= 2
                    ? 'bg-[#F4C430] text-[#071530] shadow-[0_0_20px_rgba(244,196,48,0.6)] scale-110'
                    : 'bg-[#112A5C] text-slate-400 border border-[#1E4080] scale-95'
                }`}
              >
                02
              </div>
            </div>

            {/* Step 3 Indicator Badge (Over Node 3) */}
            <div className="absolute top-1/2 right-12 -translate-y-1/2 translate-x-1/2">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-black font-['Poppins'] text-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeStage >= 3
                    ? 'bg-[#29D6F0] text-[#071530] shadow-[0_0_20px_rgba(41,214,240,0.7)] scale-110'
                    : 'bg-[#112A5C] text-slate-400 border border-[#1E4080] scale-95'
                }`}
              >
                03
              </div>
            </div>
          </div>

          {/* 3 Step Cards in Desktop Row with sequential lighting */}
          <div className="grid grid-cols-3 gap-7 items-stretch">
            {/* Step 1 Card */}
            <div
              className={`bg-gradient-to-br from-[#071530] via-[#091D45] to-[#071530] border rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeStage >= 1
                  ? 'opacity-100 translate-y-0 border-[#29D6F0]/60 shadow-xl shadow-black/40'
                  : 'opacity-25 translate-y-5 border-[#1E4080]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#112A5C] border border-[#29D6F0]/40 flex items-center justify-center text-[#29D6F0] shadow-inner">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#112A5C] text-[#29D6F0] border border-[#29D6F0]/25 text-xs font-semibold">
                    Aproximação NFC
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 font-['Poppins'] leading-snug">
                  O cliente encosta o celular na placa Reviewy
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Basta aproximar a parte traseira de qualquer smartphone (iPhone ou Android) do Reviewy. Não há câmera para abrir, nem aplicativo para baixar.
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E4080]/70 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ReviewyStarMarker size="sm" />
                  <span>NFC automático em 99% dos celulares</span>
                </div>
                <div className="flex items-center gap-2">
                  <ReviewyStarMarker size="sm" color="#F4C430" />
                  <span>QR Code no verso como alternativa imediata</span>
                </div>
              </div>
            </div>

            {/* Step 2 Card */}
            <div
              className={`bg-[#071530] border rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeStage >= 2
                  ? 'opacity-100 translate-y-0 border-[#F4C430]/60 shadow-xl shadow-black/40'
                  : 'opacity-25 translate-y-5 border-[#1E4080]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#112A5C] border border-[#F4C430]/40 flex items-center justify-center text-[#F4C430] shadow-inner">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#112A5C] text-slate-300 border border-[#1E4080] text-xs font-semibold">
                    Zero Digitação
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 font-['Poppins'] leading-snug">
                  O Google abre na hora
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  O link codificado direciona em milissegundos para a caixa de 5 estrelas do seu perfil oficial no Google Meu Negócio.
                </p>
              </div>

              <div className="bg-[#0B1F45] rounded-xl p-3.5 border border-[#1E4080] text-xs text-slate-300 flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  G
                </div>
                <span>Direto para a caixa de nota do seu negócio</span>
              </div>
            </div>

            {/* Step 3 Card */}
            <div
              className={`bg-gradient-to-br from-[#071530] via-[#0E2859] to-[#071530] border-2 rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeStage >= 3
                  ? 'opacity-100 translate-y-0 border-[#29D6F0]/70 shadow-2xl shadow-[#29D6F0]/15'
                  : 'opacity-25 translate-y-5 border-[#1E4080]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#29D6F0]/20 border border-[#29D6F0]/50 flex items-center justify-center text-[#29D6F0] shadow-inner">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#29D6F0]/15 text-[#29D6F0] border border-[#29D6F0]/30 text-xs font-bold uppercase">
                    Resultado Imediato
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 font-['Poppins'] leading-snug">
                  5 estrelas registradas e mais visibilidade
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  O cliente toca nas 5 estrelas e publica. A cada avaliação positiva somada, o Google Maps eleva o ranqueamento do seu negócio na região.
                </p>
              </div>

              <div className="bg-[#071530]/90 border border-[#29D6F0]/40 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      viewBox="0 0 24 24"
                      fill={s === 3 ? '#29D6F0' : '#F4C430'}
                      className="w-4 h-4 drop-shadow-[0_0_4px_rgba(244,196,48,0.5)]"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[11px] text-[#29D6F0] font-semibold block">
                  Tempo médio: menos de 30 segundos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE / TABLET VIEW (Vertical connected timeline line) --- */}
        <div className="lg:hidden relative pl-8 sm:pl-10 space-y-8">
          {/* Vertical SVG connecting line */}
          <div className="absolute top-6 bottom-6 left-3 sm:left-4 w-1 -translate-x-1/2">
            {/* Background inactive track */}
            <div className="w-full h-full bg-[#1E4080]/60 rounded-full" />
            {/* Active drawing fill */}
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#29D6F0] via-[#F4C430] to-[#29D6F0] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                height:
                  activeStage === 0
                    ? '0%'
                    : activeStage === 1
                    ? '20%'
                    : activeStage === 2
                    ? '65%'
                    : '100%',
              }}
            />
          </div>

          {/* Mobile Step 1 */}
          <div
            className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              activeStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-25 translate-y-3'
            }`}
          >
            {/* Dot Node */}
            <div
              className={`absolute -left-8 sm:-left-10 top-5 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs font-['Poppins'] transition-all ${
                activeStage >= 1
                  ? 'bg-[#29D6F0] text-[#071530] shadow-[0_0_12px_rgba(41,214,240,0.6)]'
                  : 'bg-[#112A5C] text-slate-400 border border-[#1E4080]'
              }`}
            >
              01
            </div>

            <div className="bg-[#071530] border border-[#1E4080] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-5 h-5 text-[#29D6F0]" />
                <span className="text-xs font-semibold text-[#29D6F0] uppercase tracking-wider">
                  Aproximação NFC
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-['Poppins']">
                O cliente encosta o celular na placa Reviewy
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Basta aproximar a parte traseira de qualquer smartphone. Sem app, sem digitação.
              </p>
            </div>
          </div>

          {/* Mobile Step 2 */}
          <div
            className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              activeStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-25 translate-y-3'
            }`}
          >
            {/* Dot Node */}
            <div
              className={`absolute -left-8 sm:-left-10 top-5 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs font-['Poppins'] transition-all ${
                activeStage >= 2
                  ? 'bg-[#F4C430] text-[#071530] shadow-[0_0_12px_rgba(244,196,48,0.6)]'
                  : 'bg-[#112A5C] text-slate-400 border border-[#1E4080]'
              }`}
            >
              02
            </div>

            <div className="bg-[#071530] border border-[#1E4080] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-[#F4C430]" />
                <span className="text-xs font-semibold text-[#F4C430] uppercase tracking-wider">
                  Zero Digitação
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-['Poppins']">
                O Google abre na hora
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                O link direto leva em segundos à caixa de 5 estrelas do seu perfil oficial no Google.
              </p>
            </div>
          </div>

          {/* Mobile Step 3 */}
          <div
            className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              activeStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-25 translate-y-3'
            }`}
          >
            {/* Dot Node */}
            <div
              className={`absolute -left-8 sm:-left-10 top-5 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs font-['Poppins'] transition-all ${
                activeStage >= 3
                  ? 'bg-[#29D6F0] text-[#071530] shadow-[0_0_12px_rgba(41,214,240,0.7)]'
                  : 'bg-[#112A5C] text-slate-400 border border-[#1E4080]'
              }`}
            >
              03
            </div>

            <div className="bg-gradient-to-br from-[#071530] to-[#0E2859] border border-[#29D6F0]/50 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-[#29D6F0]" />
                <span className="text-xs font-semibold text-[#29D6F0] uppercase tracking-wider">
                  Resultado Imediato
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-['Poppins']">
                5 estrelas registradas
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mais avaliações aumentam seu ranqueamento orgânico no Google Maps para clientes locais.
              </p>
            </div>
          </div>
        </div>

        {/* Ready Out of the Box Guarantee Panel */}
        <div className="mt-12 bg-[#071530] border border-[#1E4080] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#29D6F0]/10 border border-[#29D6F0]/30 flex items-center justify-center text-[#29D6F0] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Pronto para uso imediato ao sair da embalagem
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                A placa Reviewy já chega pré-configurada e gravada com o link direto do seu perfil no Google Meu Negócio.
              </p>
            </div>
          </div>

          <a
            href="#planos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#112A5C] hover:bg-[#163773] text-white border border-[#29D6F0]/40 text-sm font-semibold transition-all shrink-0 hover:border-[#29D6F0]"
          >
            <span>Ver os produtos</span>
            <ArrowRight className="w-4 h-4 text-[#29D6F0]" />
          </a>
        </div>
      </div>
    </section>
  );
};
