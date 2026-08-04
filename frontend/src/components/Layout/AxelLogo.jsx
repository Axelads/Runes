import React, { useMemo } from 'react';

const DEFAULT_LOGO_SRC = 'https://i.ibb.co/3yDkgD4L/logo-Axel-Gregoire-Modifi-Modifi.png';

export default function AxelLogo({
  logoSrc = DEFAULT_LOGO_SRC,
  logoAlt = 'Logo Axel Grégoire',
  size = 280,
  logoSize,
  totalDots = 36,
  innerRadius,
  outerRadius,
  smallDotSize = 6,
  bigDotSize = 11,
  hueOffset = 200,
  saturation = 85,
  lightness = 65,
  invertLogo = false,
  logoOffsetX = 0,
  logoOffsetY = 0,
  glow = true,
  rotate = true,
  rotateDuration = 18,
  rotateDirection = 'normal',
  className,
  style,
}) {
  const resolvedLogoSize    = logoSize    ?? size * 0.4;
  const resolvedInnerRadius = innerRadius ?? size * 0.28;
  const resolvedOuterRadius = outerRadius ?? size * 0.34;

  const dots = useMemo(() => {
    const out = [];
    for (let i = 0; i < totalDots; i++) {
      const angle = (i / totalDots) * 2 * Math.PI - Math.PI / 2;
      const hue   = (i / totalDots) * 360 + hueOffset;
      const isEven  = i % 2 === 0;
      const radius  = isEven ? resolvedOuterRadius : resolvedInnerRadius;
      const dotSize = isEven ? bigDotSize : smallDotSize;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      out.push({ x, y, dotSize, color });
    }
    return out;
  }, [
    totalDots, hueOffset, saturation, lightness,
    resolvedInnerRadius, resolvedOuterRadius,
    smallDotSize, bigDotSize,
  ]);

  const containerStyle = {
    position: 'relative',
    width: size,
    height: size,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...style,
  };

  const logoStyle = {
    position: 'absolute',
    width: resolvedLogoSize,
    height: resolvedLogoSize,
    objectFit: 'contain',
    transform: `translate(${logoOffsetX}px, ${logoOffsetY}px)`,
    zIndex: 10,
    userSelect: 'none',
    ...(invertLogo ? { filter: 'invert(1) brightness(1.1)' } : null),
  };

  const dotsWrapperStyle = {
    position: 'absolute',
    inset: 0,
    ...(rotate
      ? {
          animation: `axel-logo-spin ${rotateDuration}s linear infinite`,
          animationDirection: rotateDirection,
          transformOrigin: '50% 50%',
        }
      : null),
  };

  return (
    <div className={className} style={containerStyle}>
      <style>{`
        @keyframes axel-logo-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      {logoSrc && <img src={logoSrc} alt={logoAlt} style={logoStyle} draggable={false} />}
      <div style={dotsWrapperStyle} aria-hidden="true">
        {dots.map(({ x, y, dotSize, color }, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              width: dotSize,
              height: dotSize,
              left: `calc(50% + ${x}px - ${dotSize / 2}px)`,
              top:  `calc(50% + ${y}px - ${dotSize / 2}px)`,
              borderRadius: '50%',
              background: color,
              boxShadow: glow ? `0 0 6px ${color}` : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}
