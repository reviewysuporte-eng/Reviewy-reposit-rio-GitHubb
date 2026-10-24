import React, { useRef, useState, useEffect } from 'react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; // Capped at 6-8 degrees as requested
  className?: string;
  id?: string;
}

/**
 * Card com inclinação 3D sutil (rotateX / rotateY) que segue o mouse.
 * Desativado automaticamente em telas touch (mobile) e quando prefers-reduced-motion estiver ativo.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  maxTilt = 7,
  className = '',
  id,
  style,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ rotX: number; rotY: number; active: boolean }>({
    rotX: 0,
    rotY: 0,
    active: false,
  });
  const [canTilt, setCanTilt] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Apenas ativa se houver cursor fino (desktop) e sem prefers-reduced-motion
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanTilt(isFinePointer && !reducedMotion);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt || !cardRef.current) return;

    if (rafRef.current !== null) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      // Posição normalizada de -0.5 a +0.5 a partir do centro
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;

      // Inversão no eixo X para dar perspectiva realista
      const rotX = -y * (maxTilt * 2);
      const rotY = x * (maxTilt * 2);

      setTilt({ rotX, rotY, active: true });
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (!canTilt) return;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setTilt({ rotX: 0, rotY: 0, active: false });
  };

  const tiltStyle: React.CSSProperties = canTilt
    ? {
        transform: tilt.active
          ? `perspective(1000px) rotateX(${tilt.rotX.toFixed(2)}deg) rotateY(${tilt.rotY.toFixed(2)}deg)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: tilt.active
          ? 'transform 0.12s ease-out'
          : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        willChange: tilt.active ? 'transform' : 'auto',
        ...style,
      }
    : style || {};

  return (
    <div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={tiltStyle}
      {...props}
    >
      {children}
    </div>
  );
};
