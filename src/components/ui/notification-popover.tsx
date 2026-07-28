import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
};

interface NotificationItemProps {
  notification: Notification;
  index: number;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem = ({ notification, index, onMarkAsRead }: NotificationItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2, delay: index * 0.05 }}
    onClick={() => onMarkAsRead(notification.id)}
    className="cursor-pointer px-4 py-3 transition-colors hover:bg-black/[0.05]"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        {!notification.read && (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
        )}
        <span className={cn("text-sm font-medium", notification.read && "text-muted-foreground")}>
          {notification.title}
        </span>
      </div>
      <span className="shrink-0 text-[10px] text-muted-foreground">
        {notification.timestamp.toLocaleDateString()}
      </span>
    </div>
    <p className="mt-1 pl-0 text-xs leading-snug text-muted-foreground">{notification.description}</p>
  </motion.div>
);

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Offline payments pending",
    description: "2 offline payments awaiting approval in reconciliation queue.",
    timestamp: new Date(),
    read: false,
  },
  {
    id: "2",
    title: "New waiver request",
    description: "Aarav Sharma's parent requested a late fee waiver (₹4,500).",
    timestamp: new Date(),
    read: false,
  },
  {
    id: "3",
    title: "UPI settlement received",
    description: "₹2,84,300 settled to the school account by HDFC.",
    timestamp: new Date(Date.now() - 86400000),
    read: false,
  },
];

export function NotificationPopover({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const markAllAsRead = () => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const markAsRead = (id: string) =>
    setNotifications((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div ref={ref} className={cn("relative shrink-0", className)}>
      <button
        aria-label="Notifications"
        onClick={() => setIsOpen((o) => !o)}
        className="relative grid h-10 w-10 place-items-center rounded-xl border border-black/[0.07] bg-black/[0.04] transition hover:bg-black/[0.07]"
      >
        <Bell className="h-[18px] w-[18px]" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[oklch(0.7_0.2_25)] px-1 text-[10px] font-semibold text-white shadow-[0_0_8px_oklch(0.7_0.2_25)]">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="glass absolute right-0 top-full z-50 mt-3 w-[320px] overflow-hidden rounded-2xl shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-black/[0.07] px-4 py-3">
              <span className="text-sm font-semibold">Notifications</span>
              <button
                onClick={markAllAsRead}
                className="text-[11px] font-medium text-muted-foreground transition hover:text-foreground"
              >
                Mark all as read
              </button>
            </div>
            <div className="max-h-[320px] divide-y divide-black/[0.06] overflow-y-auto">
              {notifications.map((n, i) => (
                <NotificationItem key={n.id} notification={n} index={i} onMarkAsRead={markAsRead} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
