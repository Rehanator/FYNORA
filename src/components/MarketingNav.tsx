import { Link } from "@tanstack/react-router";

import fynoraLogo from "@/assets/fynora-logo.png.asset.json";
import { ThemeToggle } from "./ThemeToggle";
import { AppDock } from "./AppDock";

export function MarketingNav() {
  return (
    <header className="sticky top-4 z-40 mx-auto mt-4 w-[min(1200px,calc(100%-1.5rem))]">
      <div className="glass flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={fynoraLogo.url}
            alt="FYNORA logo"
            className="h-9 w-auto object-contain"
          />
          <span className="text-lg font-bold uppercase tracking-widest">FYNORA</span>
        </Link>

        <nav className="hidden items-center md:flex">
          <AppDock />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
