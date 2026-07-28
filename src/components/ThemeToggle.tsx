import { useEffect, useState, lazy, Suspense } from "react";

const SkyToggle = lazy(() => import("./ui/sky-toggle"));

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem("ssft-theme") as "light" | "dark" | null) ?? "dark";
    setTheme(stored);
    applyTheme(stored);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("ssft-theme", next);
  };

  if (!mounted) {
    return <div className={`inline-block h-[30px] w-[68px] ${className}`} aria-hidden />;
  }

  return (
    <div className={`inline-flex shrink-0 items-center ${className}`}>
      <Suspense fallback={<div className="h-[30px] w-[68px]" aria-hidden />}>
        <SkyToggle checked={theme === "dark"} onChange={toggle} ariaLabel="Toggle theme" />
      </Suspense>
    </div>
  );
}
