import React, { useEffect, useState } from 'react';
import { ReviewyLogo } from './ReviewyLogo';

interface EntryAnimationProps {
  onComplete: () => void;
}

/**
 * Animação de entrada com a Logo Oficial da Reviewy
 * Exibe a marca vetorial oficial com transição suave e iluminação ciano
 */
export const EntryAnimation: React.FC<EntryAnimationProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [glowActive, setGlowActive] = useState(false);

  const handleFinish = () => {
    setIsExiting(true);
    try {
      sessionStorage.setItem('reviewy_intro_seen', 'true');
    } catch {
      // safe fallback
    }
    setTimeout(() => {
      onComplete();
    }, 350);
  };

  useEffect(() => {
    // Ativa pulso de brilho após 300ms
    const tGlow = setTimeout(() => setGlowActive(true), 300);
    // Conclusão e transição suave para o Hero (1800ms)
    const tFinish = setTimeout(() => handleFinish(), 1800);

    return () => {
      clearTimeout(tGlow);
      clearTimeout(tFinish);
    };
  }, []);

  return (
    <div
      id="entry-animation-screen"
      onClick={handleFinish}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#01204c] cursor-pointer transition-all duration-400 select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Luz ambiente radial ciano */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,232,252,0.18)_0%,transparent_65%)] pointer-events-none transition-opacity duration-700 ${
          glowActive ? 'opacity-100' : 'opacity-30'
        }`}
      />

      <div className="relative flex flex-col items-center px-6">
        <div
          className={`transform transition-all duration-700 ease-out ${
            glowActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
          }`}
        >
          <ReviewyLogo
            size="custom"
            className="w-72 sm:w-96 md:w-[460px] h-auto drop-shadow-[0_10px_35px_rgba(7,232,252,0.25)]"
            showStars={true}
            animated={true}
          />
        </div>
      </div>

      {/* Rótulo de pular */}
      <div className="absolute bottom-8 text-xs text-[#faf7f0]/50 tracking-wider uppercase font-medium">
        Toque em qualquer lugar para pular
      </div>
    </div>
  );
};
