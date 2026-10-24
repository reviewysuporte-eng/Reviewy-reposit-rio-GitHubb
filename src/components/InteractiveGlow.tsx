import React, { useRef, useEffect, useState } from 'react';

interface InteractiveGlowProps {
  className?: string;
  color?: string;
  size?: number;
}

/**
 * Gradiente radial sutil que acompanha suavemente a posição do cursor
 * em seções escuras via coordenadas de mouse com requestAnimationFrame.
 * Em telas mobile/touch ou com prefers-reduced-motion, permanece estático no centro.
 */
export const InteractiveGlow: React.FC<InteractiveGlowProps> = ({
  className = '',
  color = 'rgba(7, 232, 252, 0.06)',
  size = 650,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Desativa rastreamento em touch/mobile ou quando movimento reduzido estiver ativado
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || reducedMotion) {
      return;
    }

    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const rect = parent.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        setPos({ x, y });
        rafId = null;
      });
    };

    const handleMouseLeave = () => {
      setPos(null);
    };

    parent.addEventListener('mousemove', handleMouseMove, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const backgroundStyle = pos
    ? `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 65%)`
    : `radial-gradient(${size}px circle at 50% 35%, ${color}, transparent 65%)`;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none transition-opacity duration-700 ease-out z-0 ${className}`}
      style={{
        background: backgroundStyle,
      }}
    />
  );
};
