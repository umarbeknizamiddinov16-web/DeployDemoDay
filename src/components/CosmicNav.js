import Link from "next/link";

const navItems = [
  { href: "/", label: "Origin" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ai", label: "AI" },
  { href: "/terminal", label: "Terminal" },
  { href: "/system", label: "System" },
  { href: "/profile", label: "Profile" },
  { href: "/settings", label: "Settings" },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/universe", label: "Universe" },
];

export default function CosmicNav({ activePath }) {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {navItems.map((item) => {
        const active = item.href === activePath;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full border px-4 py-2 text-sm ${
              active
                ? "border-cyan-300 bg-cyan-500/20 text-cyan-50"
                : "border-[#22304a] bg-[#111827]/80 text-slate-200"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
