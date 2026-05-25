import React from "react";

export default function PlanetCard({ icon, title, subtitle, description, actions, className = "" }) {
  return (
    <div className={`relative rounded-2xl bg-[#10182a] border border-[#232b3d] shadow-lg p-6 flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/30 to-fuchsia-400/20 text-2xl">
          {icon}
        </div>
        <div>
          <div className="text-base font-bold text-white leading-tight">{title}</div>
          {subtitle && <div className="text-xs text-cyan-300 mt-1">{subtitle}</div>}
        </div>
      </div>
      {description && <div className="text-sm text-slate-300 mt-2">{description}</div>}
      {actions && <div className="mt-3">{actions}</div>}
    </div>
  );
}
