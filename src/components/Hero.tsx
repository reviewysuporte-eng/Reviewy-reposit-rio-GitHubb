import React, { useState, useEffect, useRef, useCallback } from 'react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/plans';
import { ReviewyLogo } from './ReviewyLogo';
import { ReviewyStarMarker, ReviewyNfcGlyph, ReviewyNfcWatermark } from './ReviewyBrandElements';
import { InteractiveGlow } from './InteractiveGlow';
import { Instagram, ArrowDown, QrCode, CreditCard, LayoutTemplate, X } from 'lucide-react';

const DISPLAY_DURATION_MS = 3800; // Tempo de exibição da tela do Google (~3,8s)
const IDLE_CYCLE_DELAY_MS = 6000; // Tempo de inatividade antes de simular loop suave (6s)

export const Hero: React.FC = () => {
  // Toggle entre Placa Adesiva e Placa de Balcão
  const [productFormat, setProductFormat] = useState<'adhesive' | 'display'>('adhesive');
  // Estado da demonstração interativa: inicia SEMPRE fechada
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isApproaching, setIsApproaching] = useState(false);

  const displayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tapDelayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTouchTimeRef = useRef<number>(0);

  // Fecha o popup com transição de saída suave
  const closePopup = useCallback(() => {
    if (displayTimerRef.current) {
      clearTimeout(displayTimerRef.current);
      displayTimerRef.current = null;
    }
    if (tapDelayTimerRef.current) {
      clearTimeout(tapDelayTimerRef.current);
      tapDelayTimerRef.current = null;
    }
    setIsPopupVisible(false);
    setIsApproaching(false);
  }, []);

  // Agenda um ciclo automático por inatividade
  const scheduleIdleCycle = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    idleTimerRef.current = setTimeout(() => {
      // Dispara ciclo suave se o popup estiver fechado
      setIsApproaching(true);
      tapDelayTimerRef.current = setTimeout(() => {
        setIsApproaching(false);
        setIsPopupVisible(true);

        // Mantém aberto por ~3,8s e fecha suavemente
        displayTimerRef.current = setTimeout(() => {
          setIsPopupVisible(false);
          scheduleIdleCycle();
        }, DISPLAY_DURATION_MS);
      }, 200);
    }, IDLE_CYCLE_DELAY_MS);
  }, []);

  // Dispara a demonstração interativa
  const triggerDemo = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
    if (tapDelayTimerRef.current) clearTimeout(tapDelayTimerRef.current);

    // Efeito sutil de aproximação/toque de 200ms
    setIsApproaching(true);
    tapDelayTimerRef.current = setTimeout(() => {
      setIsApproaching(false);
      setIsPopupVisible(true);

      // Mantém aberto por ~3,8s para leitura e depois transiciona para fora
      displayTimerRef.current = setTimeout(() => {
        setIsPopupVisible(false);
        scheduleIdleCycle();
      }, DISPLAY_DURATION_MS);
    }, 200);
  }, [scheduleIdleCycle]);

  // Ciclo inicial de inatividade
  useEffect(() => {
    scheduleIdleCycle();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
      if (tapDelayTimerRef.current) clearTimeout(tapDelayTimerRef.current);
    };
  }, [scheduleIdleCycle]);

  // Ação unificada de interação (Touch ou Clique)
  const handleInteraction = () => {
    if (isPopupVisible) {
      closePopup();
      scheduleIdleCycle();
    } else {
      triggerDemo();
    }
  };

  // Clique com mouse no mockup da placa
  const handleCardClick = () => {
    // Ignora clique sintético disparado logo após evento de touch (< 450ms)
    if (Date.now() - lastTouchTimeRef.current < 450) {
      return;
    }
    handleInteraction();
  };

  // Toque direto em dispositivos mobile/touch
  const handleCardTouchEnd = (e: React.TouchEvent) => {
    lastTouchTimeRef.current = Date.now();
    handleInteraction();
  };

  // Alternância de formato (Placa Adesiva vs Placa de Balcão)
  const handleFormatChange = (format: 'adhesive' | 'display') => {
    closePopup();
    setProductFormat(format);
    scheduleIdleCycle();
  };

  return (
    <section
      id="hero-section"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#081736] via-[#0B1F45] to-[#081736]"
    >
      {/* Subtle cursor-following radial glow (Item 5) */}
      <InteractiveGlow color="rgba(7, 232, 252, 0.07)" size={750} />

      {/* Branded NFC Wave subtle background watermark */}
      <ReviewyNfcWatermark className="top-12 -right-16 w-96 h-96" opacity={0.035} />
      <ReviewyNfcWatermark className="-bottom-20 -left-20 w-80 h-80 rotate-45" opacity={0.025} />

      {/* Ambient soft glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#29D6F0]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Action */}
          <div className="lg:col-span-7 flex flex-col text-left space-y-6">
            {/* Branded Architecture Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-lg bg-[#112A5C]/90 border border-[#29D6F0]/30 w-fit text-xs sm:text-sm font-medium text-slate-200">
              <ReviewyNfcGlyph className="w-4 h-4 text-[#29D6F0]" />
              <span className="text-white font-semibold">Tecnologia NFC & QR Code</span>
              <span className="text-[#29D6F0]/60">·</span>
              <span className="text-[#29D6F0]">Sem mensalidade</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] font-extrabold text-white tracking-tight leading-[1.16] font-['Poppins']">
              Transforme cada cliente satisfeito em{' '}
              <span className="text-[#29D6F0] underline decoration-[#29D6F0]/40 decoration-4 underline-offset-6">
                mais clientes
              </span>{' '}
              — não só em estrelas.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              As placas Reviewy transformam satisfação em avaliação 5 estrelas no Google num toque — e cada avaliação nova aumenta sua visibilidade pra quem ainda não te conhece.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary CTA: Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-primary-instagram"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 text-base font-bold rounded-full bg-[#29D6F0] text-[#071530] hover:bg-[#4fe1f7] transition-all duration-200 shadow-lg shadow-[#29D6F0]/25 hover:shadow-xl hover:shadow-[#29D6F0]/35 hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <Instagram className="w-5 h-5 text-[#071530] transition-transform group-hover:scale-110" />
                <span>Pedir no Instagram</span>
                <span className="text-xs bg-[#071530]/15 px-2 py-0.5 rounded-full font-medium">
                  {INSTAGRAM_HANDLE}
                </span>
              </a>

              {/* Secondary CTA: How it works */}
              <a
                href="#como-funciona"
                id="hero-cta-secondary-scroll"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold rounded-full bg-[#112A5C]/80 hover:bg-[#163773] text-white border border-[#1E4080] hover:border-[#29D6F0]/40 transition-all duration-200 text-center"
              >
                <span>Ver como funciona</span>
                <ArrowDown className="w-4 h-4 text-[#29D6F0]" />
              </a>
            </div>

            {/* Proof & Simplicity Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-[#1E4080]/60 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <ReviewyStarMarker size="sm" />
                <span>Compatível com iPhone & Android</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ReviewyStarMarker size="sm" />
                <span>Sem baterias nem cabos</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ReviewyStarMarker size="sm" color="#F4C430" />
                <span>Pronto em 2 minutos (já configurado)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ReviewyStarMarker size="sm" color="#29D6F0" />
                <span className="text-white font-semibold">
                  Sem mensalidade — pagamento único
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Product Demo with Format Toggle (Item 1) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Format Toggle Pill Above Mockup */}
            <div className="mb-4 inline-flex items-center p-1 rounded-full bg-[#071530] border border-[#1E4080] shadow-md select-none z-20">
              <button
                type="button"
                id="toggle-format-adhesive"
                onClick={() => handleFormatChange('adhesive')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  productFormat === 'adhesive'
                    ? 'bg-[#29D6F0] text-[#071530] shadow-sm shadow-[#29D6F0]/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <ReviewyNfcGlyph className="w-3.5 h-3.5" />
                <span>Placa Adesiva (9×12cm)</span>
              </button>

              <button
                type="button"
                id="toggle-format-display"
                onClick={() => handleFormatChange('display')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  productFormat === 'display'
                    ? 'bg-[#29D6F0] text-[#071530] shadow-sm shadow-[#29D6F0]/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutTemplate className="w-3.5 h-3.5" />
                <span>Placa de Balcão (A6)</span>
              </button>
            </div>

            {/* Interactive Simulation Frame */}
            <div className="w-full max-w-md relative">
              {/* Pulsing NFC Aura behind the plate */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl pointer-events-none transition-all duration-500 ${
                  isApproaching || isPopupVisible
                    ? 'bg-[#29D6F0]/35 scale-125'
                    : 'bg-[#29D6F0]/15'
                }`}
              />

              {/* Clickable Mockup Container with cross-fade between formats and smooth popup overlay */}
              <div
                id="product-interactive-mockup"
                onClick={handleCardClick}
                onTouchEnd={handleCardTouchEnd}
                role="button"
                tabIndex={0}
                title="Clique para ver como funciona"
                className={`relative z-10 w-full rounded-2xl cursor-pointer select-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform group touch-manipulation ${
                  isApproaching
                    ? 'scale-[0.98]'
                    : isPopupVisible
                    ? 'scale-100 ring-2 ring-[#29D6F0]/70 shadow-[0_0_35px_rgba(41,214,240,0.35)]'
                    : 'hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(41,214,240,0.25)]'
                }`}
              >
                {/* Format 1: Placa Adesiva Reviewy (9 × 12cm) */}
                <div
                  className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    productFormat === 'adhesive'
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-3 pointer-events-none absolute inset-0'
                  }`}
                >
                  <div className="w-full aspect-[1.25/1] min-h-[275px] sm:min-h-[290px] rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-[#0B214C] via-[#071634] to-[#040C1D] border-2 border-[#29D6F0]/60 shadow-2xl shadow-black/70 flex flex-col justify-between relative overflow-hidden">
                    {/* Adhesive peel indicator */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#29D6F0]/25 via-white/5 to-transparent rounded-tr-2xl pointer-events-none" />

                    {/* Plate Top */}
                    <div className="flex items-center justify-between">
                      <ReviewyLogo size="sm" showStars={false} />
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#29D6F0] bg-[#112A5C] px-2.5 py-1 rounded-md border border-[#29D6F0]/30">
                          9 × 12cm · Adesiva
                        </span>
                        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#112A5C]/80 border border-[#29D6F0]/50 text-[#29D6F0]">
                          <ReviewyNfcGlyph className="w-4 h-4" strokeWidth={2.4} />
                          <span className="absolute inset-0 rounded-full border border-[#29D6F0] animate-ping opacity-30" />
                        </div>
                      </div>
                    </div>

                    {/* Plate Center: Instruction & Realistic Click Copy */}
                    <div className="my-auto text-center py-2">
                      <div className="flex items-center justify-center gap-1.5 mb-1.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <svg
                            key={i}
                            viewBox="0 0 24 24"
                            fill={i === 3 ? '#00C9F0' : '#F8BA15'}
                            stroke={i === 3 ? '#00C9F0' : '#F8BA15'}
                            strokeWidth="1.2"
                            strokeLinejoin="round"
                            className={`w-4 h-4 ${
                              i === 3
                                ? 'w-5 h-5 drop-shadow-[0_0_8px_rgba(0,201,240,0.8)] -translate-y-[1px]'
                                : ''
                            }`}
                          >
                            <path d="M 12 2.5 L 14.9 8.6 L 21.6 9.4 L 16.7 14.1 L 18 20.8 L 12 17.5 L 6 20.8 L 7.3 14.1 L 2.4 9.4 L 9.1 8.6 Z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-white font-bold text-base sm:text-lg tracking-wide block">
                        Avalie no Google em 1 toque
                      </span>
                      <span className="text-[#29D6F0] text-xs font-semibold inline-flex items-center gap-1.5 mt-2 bg-[#112A5C] hover:bg-[#163773] px-3.5 py-1.5 rounded-full border border-[#29D6F0]/40 shadow-sm transition-all duration-200">
                        <ReviewyNfcGlyph className="w-3.5 h-3.5 animate-pulse" />
                        <span>Clique para testar a aproximação</span>
                      </span>
                    </div>

                    {/* Plate Bottom */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-[11px] text-slate-300 font-medium">
                      <span className="text-[#29D6F0] font-medium">Adesivo sem resíduo</span>
                      <div className="flex items-center gap-2 text-[10px] text-[#29D6F0] font-mono uppercase">
                        <span>NFC</span>
                        <span className="text-slate-500">|</span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <QrCode className="w-3 h-3 text-[#F4C430]" /> QR Code
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Format 2: Placa de Balcão Reviewy (10 × 15cm A6 com base acrílica) */}
                <div
                  className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    productFormat === 'display'
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-3 pointer-events-none absolute inset-0'
                  }`}
                >
                  <div className="w-full aspect-[1.25/1] min-h-[275px] sm:min-h-[290px] rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-[#0F2F6B]/90 via-[#0B214C]/85 to-[#071530] border-2 border-[#29D6F0]/60 shadow-2xl shadow-black/80 flex flex-col justify-between relative overflow-hidden">
                    {/* Slanted crystal acrylic reflection */}
                    <div className="absolute top-0 right-0 w-36 h-full bg-gradient-to-l from-white/15 to-transparent pointer-events-none rounded-r-2xl" />

                    {/* Display Top */}
                    <div className="flex items-center justify-between relative z-10">
                      <ReviewyLogo size="sm" showStars={false} />
                      <div className="px-2.5 py-1 rounded-md bg-[#29D6F0]/20 border border-[#29D6F0]/40 text-[#29D6F0] text-[10px] font-extrabold uppercase tracking-wider">
                        10 × 15cm (A6) · Base Acrílica
                      </div>
                    </div>

                    {/* Display Center: Realistic Click Copy */}
                    <div className="my-auto text-center py-2 relative z-10">
                      <div className="flex items-center justify-center gap-1 mb-1.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <svg
                            key={i}
                            viewBox="0 0 24 24"
                            fill={i === 3 ? '#00C9F0' : '#F8BA15'}
                            stroke={i === 3 ? '#00C9F0' : '#F8BA15'}
                            strokeWidth="1.2"
                            strokeLinejoin="round"
                            className={`w-4 h-4 ${
                              i === 3
                                ? 'w-5 h-5 drop-shadow-[0_0_8px_rgba(0,201,240,0.8)] -translate-y-[1px]'
                                : ''
                            }`}
                          >
                            <path d="M 12 2.5 L 14.9 8.6 L 21.6 9.4 L 16.7 14.1 L 18 20.8 L 12 17.5 L 6 20.8 L 7.3 14.1 L 2.4 9.4 L 9.1 8.6 Z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-white font-bold text-base sm:text-lg tracking-wide block">
                        Aproxime seu celular aqui
                      </span>
                      <span className="text-[#29D6F0] text-xs font-semibold inline-flex items-center gap-1.5 mt-2 bg-[#112A5C] hover:bg-[#163773] px-3.5 py-1.5 rounded-full border border-[#29D6F0]/40 shadow-sm transition-all duration-200">
                        <ReviewyNfcGlyph className="w-3.5 h-3.5 animate-pulse" />
                        <span>Clique para testar a aproximação</span>
                      </span>
                    </div>

                    {/* Display Base */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-[11px] text-slate-300 font-medium relative z-10">
                      <span className="text-[#F4C430] font-semibold">Fica em pé no balcão/caixa</span>
                      <span className="text-[10px] text-[#29D6F0] font-mono">SUPORTE INCLUSO</span>
                    </div>
                  </div>
                </div>

                {/* Pop-up Simulation: Google Review on Customer's Phone (Problema 2) */}
                {/* Entra com fade + slide de baixo para cima via transform/opacity; nunca aparece aberto no início */}
                <div
                  id="google-review-simulation-modal"
                  aria-hidden={!isPopupVisible}
                  className="absolute inset-0 z-30 rounded-2xl bg-white text-slate-900 shadow-2xl border-2 border-[#29D6F0]/60 p-4 sm:p-5 flex flex-col justify-between overflow-hidden"
                  style={{
                    transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isPopupVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
                    opacity: isPopupVisible ? 1 : 0,
                    pointerEvents: isPopupVisible ? 'auto' : 'none',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Subtle auto-dismiss countdown bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-[#29D6F0] to-[#4285F4] ${
                        isPopupVisible ? 'w-full' : 'w-0'
                      }`}
                      style={{
                        transition: isPopupVisible ? `width ${DISPLAY_DURATION_MS}ms linear` : 'none',
                      }}
                    />
                  </div>

                  {/* Top Bar */}
                  <div className="flex items-start justify-between pt-1 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                        G
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                          Google Meu Negócio
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                          Seu Estabelecimento no Google
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        closePopup();
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                        closePopup();
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 font-medium cursor-pointer touch-manipulation"
                      title="Fechar demonstração"
                    >
                      <span>Fechar</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Review Details */}
                  <div className="py-2">
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                      Compartilhe os detalhes da sua experiência:
                    </p>
                    <div className="flex items-center gap-1 py-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          viewBox="0 0 24 24"
                          fill="#F4C430"
                          className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_1px_2px_rgba(244,196,48,0.4)]"
                        >
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      ))}
                      <span className="text-[10px] sm:text-xs font-bold text-emerald-700 ml-2 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                        5 estrelas
                      </span>
                    </div>
                    <div className="mt-1.5 text-[11px] sm:text-xs bg-slate-50 border border-slate-200/80 rounded-lg p-2 sm:p-2.5 text-slate-600 italic leading-snug">
                      &quot;Atendimento maravilhoso e ambiente impecável! Recomendo a todos.&quot;
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 text-[10px] sm:text-[11px]">
                      Abre direto no celular sem digitar nada
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        closePopup();
                      }}
                      className="bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      Postar avaliação
                    </button>
                  </div>
                </div>
              </div>

              {/* Approach Animation Indicator */}
              {isApproaching && (
                <div className="mt-3 text-center text-xs text-[#29D6F0] font-semibold animate-pulse flex items-center justify-center gap-1.5">
                  <ReviewyNfcGlyph className="w-3.5 h-3.5 animate-spin" />
                  <span>Simulando aproximação do smartphone...</span>
                </div>
              )}
            </div>

            {/* Helper cue under mockup */}
            <div className="mt-4 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B1F45]/90 border border-[#1E4080] text-xs text-slate-300 select-none">
              <QrCode className="w-4 h-4 text-[#F4C430] shrink-0" />
              <span>
                <strong className="text-white font-medium">Sem NFC no celular?</strong> Funciona também com QR Code impresso no verso.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
