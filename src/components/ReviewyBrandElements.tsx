import React from 'react';

interface ReviewyStarMarkerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

/**
 * Marcador de estrela oficial Reviewy
 * Usa a estrela ciano (#00C9F0) central da identidade visual oficial.
 */
export const ReviewyStarMarker: React.FC<ReviewyStarMarkerProps> = ({
  className = '',
  size = 'md',
  color = '#00C9F0',
}) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill={color}
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
        className={`${sizeClasses[size]} drop-shadow-[0_0_6px_rgba(0,201,240,0.6)]`}
      >
        <path d="M 12 2.5 L 14.9 8.6 L 21.6 9.4 L 16.7 14.1 L 18 20.8 L 12 17.5 L 6 20.8 L 7.3 14.1 L 2.4 9.4 L 9.1 8.6 Z" />
      </svg>
    </span>
  );
};

interface ReviewyNfcGlyphProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

/**
 * Ícone oficial das ondas NFC da marca Reviewy
 * As duas ondas arqueadas concêntricas emitindo sinal no quadrante nordeste,
 * exatamente como desenhado no topo da letra 'V' do logo.
 */
export const ReviewyNfcGlyph: React.FC<ReviewyNfcGlyphProps> = ({
  className = 'w-6 h-6',
  color = '#00C9F0',
  strokeWidth = 3,
}) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Onda interna */}
      <path
        d="M 8 24 A 14 14 0 0 1 24 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Onda externa */}
      <path
        d="M 5 15 A 22 22 0 0 1 29 8"
        stroke={color}
        strokeWidth={strokeWidth + 0.5}
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Marca d'água de sinal NFC para fundos de seções
 */
export const ReviewyNfcWatermark: React.FC<{
  className?: string;
  opacity?: number;
}> = ({ className = '', opacity = 0.05 }) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <ReviewyNfcGlyph
        className="w-full h-full text-[#00C9F0]"
        strokeWidth={2}
      />
    </div>
  );
};

/**
 * Divisor geométrico elegante com ondas NFC
 */
export const ReviewySectionDivider: React.FC<{
  flip?: boolean;
}> = ({ flip = false }) => {
  return (
    <div
      className={`relative w-full flex items-center justify-center py-4 overflow-hidden pointer-events-none ${
        flip ? 'rotate-180' : ''
      }`}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-[#00C9F0]/25 to-transparent w-full max-w-4xl" />
      <div className="absolute px-4 bg-[#071530] text-[#00C9F0]/50 flex items-center gap-2">
        <ReviewyNfcGlyph className="w-4 h-4 text-[#00C9F0]/60" />
      </div>
    </div>
  );
};
