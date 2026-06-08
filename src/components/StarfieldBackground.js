"use client";

import { useMemo } from "react";

export default function StarfieldBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 90 }, (_, index) => ({
      id: index,
      left: `${(index * 73) % 100}`,
      top: `${(index * 37) % 100}`,
      size: index % 3 === 0 ? 2.4 : index % 5 === 0 ? 1.6 : 1,
      opacity: index % 4 === 0 ? 0.95 : index % 3 === 0 ? 0.7 : 0.5,
      duration: 18 + (index % 11) * 3,
      delay: (index % 7) * -1.5,
      driftX: ((index % 3) - 1) * 30, // Случайное смещение по X (-30px, 0px, 30px)
      driftY: ((index % 5) - 2) * 25, // Случайное смещение по Y (-50px, -25px, 0px, 25px, 50px)
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),_transparent_25%),radial-gradient(circle_at_bottom,_rgba(244,114,182,0.06),_transparent_28%)]" />
      
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 12px rgba(255,255,255,0.55)`,
            
            "--drift-x": `${star.driftX}px`,
            "--drift-y": `${star.driftY}px`,
            
            animation: `slowDrift ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}