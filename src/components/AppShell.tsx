import { useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Users,
  ShieldCheck,
  Settings,
  Search,
  Bell,
  MessageCircle,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import fynoraLogo from "@/assets/fynora-logo.png.asset.json";
import { toast } from "sonner";
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "./ui/sidebar-aceternity";
import { motion } from "framer-motion";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/fee-engine", label: "Fee Engine", icon: Wallet },
  { to: "/payments", label: "Payments", icon: CreditCard },
  { to: "/staff", label: "Staff Directory", icon: Users },
  { to: "/audit", label: "Audit Trail", icon: ShieldCheck },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function SidebarBrand() {
  const { open, animate } = useSidebar();
  return (
    <div className="flex items-center gap-3 px-1 pt-1 pb-5">
      <img src={fynoraLogo.url} alt="FYNORA logo" className="h-8 w-auto shrink-0 object-contain" />
      <motion.div
        animate={{
          display: animate ? (open ? "block" : "none") : "block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="min-w-0"
      >
        <div className="truncate text-lg font-bold uppercase tracking-widest text-white">FYNORA</div>
      </motion.div>
    </div>
  );
}

function SidebarSupport() {
  const { open, animate } = useSidebar();
  if (!animate) return null;
  return (
    <motion.div
      animate={{
        opacity: open ? 1 : 0,
        height: open ? "auto" : 0,
      }}
      className="overflow-hidden"
    >
      <div className="rounded-xl border border-black/[0.07] bg-black/[0.04] p-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)]">
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
          </div>
          <div className="text-[11px] font-semibold">Need help?</div>
        </div>
        <div className="mt-2 text-[10.5px] leading-snug text-muted-foreground">
          Reach our support desk 24/7
        </div>
        <button
          onClick={() =>
            toast("Support desk", { description: "We're online 24/7 — support@smartschool.app · +91 80 4567 1200" })
          }
          className="mt-2 w-full rounded-lg border border-black/[0.07] bg-black/[0.04] px-2 py-1.5 text-[10.5px] font-medium text-foreground hover:bg-black/[0.07]"
        >
          Contact support
        </button>
      </div>
    </motion.div>
  );
}

function SidebarNavItem({
  to,
  label,
  Icon,
  active,
}: {
  to: string;
  label: string;
  Icon: typeof LayoutDashboard;
  active: boolean;
}) {
  return (
    <SidebarLink
      link={{
        href: to,
        label,
        icon: (
          <div className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
            {active && (
              <span className="absolute -left-3 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-gradient-to-b from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)]" />
            )}
            <Icon className="h-[18px] w-[18px]" />
          </div>
        ),
      }}
      className={`rounded-xl px-2 transition-colors ${
        active
          ? "bg-black/[0.07] text-foreground shadow-inner"
          : "text-muted-foreground hover:bg-black/[0.04] hover:text-foreground"
      }`}
    />
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      {/* Pastel gradient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="pastel-blob absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[oklch(0.88_0.14_165)] opacity-30 blur-[140px]" />
        <div className="pastel-blob absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-[oklch(0.82_0.13_220)] opacity-25 blur-[160px]" />
        <div className="pastel-blob absolute bottom-[-200px] left-1/3 h-[520px] w-[520px] rounded-full bg-[oklch(0.82_0.12_300)] opacity-25 blur-[160px]" />
        <div className="pastel-blob absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[oklch(0.9_0.1_190)] opacity-15 blur-[120px]" />
      </div>

      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarBody className="glass sticky top-0 h-screen justify-between !bg-transparent">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <SidebarBrand />
              <nav className="flex flex-col gap-1">
                {nav.map((item) => {
                  const active =
                    pathname === item.to || pathname.startsWith(item.to + "/");
                  return (
                    <SidebarNavItem
                      key={item.to}
                      to={item.to}
                      label={item.label}
                      Icon={item.icon}
                      active={active}
                    />
                  );
                })}
              </nav>
            </div>
            <SidebarSupport />
          </SidebarBody>
        </Sidebar>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="glass sticky top-3 z-20 mx-3 mt-3 flex items-center gap-3 rounded-2xl px-4 py-2.5 sm:mx-6">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-black/[0.07] bg-black/[0.04] px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                placeholder="Search students, staff, transactions…"
                className="min-w-0 flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="hidden rounded border border-black/[0.09] bg-black/[0.04] px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
                ⌘K
              </kbd>
            </div>
            <ThemeToggle />
            <button
              aria-label="Notifications"
              onClick={() =>
                toast("3 new notifications", {
                  description: "2 offline payments awaiting approval · 1 waiver request.",
                })
              }
              className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-black/[0.07] bg-black/[0.04] hover:bg-black/[0.07]"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[oklch(0.82_0.16_70)] shadow-[0_0_8px_oklch(0.82_0.16_70)]" />
            </button>
            <div className="flex shrink-0 items-center gap-3 rounded-xl border border-black/[0.07] bg-black/[0.04] py-1.5 pr-3 pl-1.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.82_0.12_300)] to-[oklch(0.82_0.13_220)] text-xs font-semibold text-[oklch(0.2_0.03_260)]">
                AK
              </div>
              <div className="hidden text-left sm:block">
                <div className="text-xs font-medium leading-tight">Anita Kapoor</div>
                <div className="text-[10px] leading-tight text-muted-foreground">Principal Admin</div>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-3 py-6 sm:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
