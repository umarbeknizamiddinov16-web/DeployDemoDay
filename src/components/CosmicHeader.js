import Link from "next/link";

export default function CosmicHeader({ userName = "Explorer", onLogout }) {
  return (
    <div className="rounded-[28px] border border-[#22304a] bg-[#0b1222]/90 backdrop-blur-xl px-5 py-4 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-300">Digital Universe</div>
          <div className="mt-2 text-2xl font-black text-white">Система модулей будущего</div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100">
            Пилот: <span className="font-semibold">{userName}</span>
          </div>
          <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
            Status: ONLINE
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-100"
          >
            Выход
          </button>
        </div>
      </div>
    </div>
  );
}
