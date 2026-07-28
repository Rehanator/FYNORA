import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  { id: "1", title: "Bulk Reminders Delivered", description: "WhatsApp reminders successfully delivered to 42 parents.", timestamp: new Date(), read: false },
  { id: "2", title: "Offline payments pending", description: "5 offline payments awaiting approval in reconciliation queue.", timestamp: new Date(), read: false },
  { id: "3", title: "New waiver request", description: "Aarav Sharma's parent requested a late fee waiver (₹4,500).", timestamp: new Date(), read: false },
  { id: "4", title: "Bounced Cheque Alert", description: "Cheque #40921 from Rohan Patel's parent has bounced. Penalty added.", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), read: false },
  { id: "5", title: "High Value Payment", description: "₹1,25,000 received via NEFT from Grade 10 batch.", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), read: true },
  { id: "6", title: "UPI settlement received", description: "₹2,84,300 settled to the school account by HDFC.", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), read: true },
  { id: "7", title: "Automated Nudge Report", description: "35 parents viewed the payment link yesterday but did not complete the transaction.", timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000), read: true },
  { id: "8", title: "Cash Deposit Required", description: "₹85,000 cash collected at the counter exceeds daily safe limit.", timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), read: true },
  { id: "9", title: "System Alert", description: "Weekly reconciliation report is ready for download.", timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000), read: true },
];

export function NotificationPopover({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayedNotifications = activeTab === "unread" ? notifications.filter((n) => !n.read) : notifications;

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
            <div className="border-b border-black/[0.07] p-4">
              <div className="flex w-full items-center justify-between">
                {/* Tabs */}
                <div className="flex space-x-1 rounded-lg border border-gray-800/50 bg-black/20 p-1">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`rounded-md px-3 py-1.5 text-xs transition-all ${
                      activeTab === "all"
                        ? "bg-zinc-800 font-medium text-white shadow-sm"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab("unread")}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-all ${
                      activeTab === "unread"
                        ? "bg-zinc-800 font-medium text-white shadow-sm"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    Unread
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-red-500/20 px-1.5 py-0.5 text-[10px] font-bold text-red-400">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Mark as Read Action */}
                <Button
                  onClick={markAllAsRead}
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-gray-400 hover:bg-black/[0.05] hover:text-white"
                >
                  Mark all as read
                </Button>
              </div>
            </div>
            <div className="max-h-[320px] divide-y divide-black/[0.06] overflow-y-auto">
              {displayedNotifications.map((n, i) => (
                <NotificationItem key={n.id} notification={n} index={i} onMarkAsRead={markAsRead} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
