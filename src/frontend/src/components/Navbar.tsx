import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Radio, RefreshCw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Notification } from "../backend.d";
import {
  useMarkNotificationRead,
  useNotifications,
  useUnreadCount,
} from "../hooks/useQueries";
import { sampleNotifications } from "../utils/sampleData";
import { formatLastUpdated, relativeTime } from "../utils/timeUtils";

interface NavbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  lastUpdated: Date | null;
  isRefreshing: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  AI: "text-primary",
  Hardware: "text-cyan-400",
  Software: "text-green-400",
  Research: "text-purple-400",
  Startups: "text-orange-400",
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] || "text-muted-foreground";
}

export default function Navbar({
  search,
  onSearchChange,
  lastUpdated,
  isRefreshing,
}: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: notifications } = useNotifications();
  const { data: unreadCountBigInt } = useUnreadCount();
  const markRead = useMarkNotificationRead();

  const displayNotifications: Notification[] =
    notifications && notifications.length > 0
      ? notifications
      : sampleNotifications;
  const unreadCount =
    unreadCountBigInt !== undefined
      ? Number(unreadCountBigInt)
      : sampleNotifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen)
      document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dropdownOpen]);

  const handleMarkRead = (id: bigint) => {
    markRead.mutate(id);
  };

  const sortedNotifications = [...displayNotifications].sort((a, b) =>
    Number(b.timestamp - a.timestamp),
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex items-center justify-center w-7 h-7">
            <img
              src="/assets/generated/techpulse-logo-transparent.dim_120x120.png"
              alt="TechPulse AI"
              className="w-7 h-7 object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight text-foreground">
              TechPulse
              <span className="text-primary ml-0.5">AI</span>
            </span>
          </div>
        </div>

        <div className="w-px h-6 bg-border mx-1 hidden md:block" />

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <svg
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <Input
              data-ocid="search.search_input"
              type="search"
              placeholder="Search articles, topics, sources..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 h-8 bg-secondary border-border/60 text-sm font-mono placeholder:text-muted-foreground/60 focus-visible:ring-primary/40 focus-visible:border-primary/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto shrink-0">
          {/* Last updated */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <RefreshCw
              className={`w-3 h-3 ${isRefreshing ? "animate-refresh-spin text-amber" : "text-muted-foreground/50"}`}
            />
            {lastUpdated && (
              <span className="tabular-nums">
                {formatLastUpdated(lastUpdated)}
              </span>
            )}
          </div>

          {/* Notification bell */}
          <div className="relative" ref={dropdownRef}>
            <Button
              data-ocid="notifications.open_modal_button"
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 hover:bg-secondary hover:text-amber"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-mono font-bold text-destructive-foreground animate-badge-pulse"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </motion.span>
              )}
            </Button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  data-ocid="notifications.dropdown_menu"
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-96 rounded-md border border-border bg-popover shadow-xl z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-amber" />
                      <span className="font-display text-sm font-semibold text-foreground">
                        Notifications
                      </span>
                    </div>
                    {unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="text-[10px] h-4 px-1.5"
                      >
                        {unreadCount} unread
                      </Badge>
                    )}
                  </div>

                  <ScrollArea className="h-80 terminal-scroll">
                    <div className="divide-y divide-border/50">
                      {sortedNotifications.slice(0, 10).map((notif, idx) => (
                        <button
                          type="button"
                          key={String(notif.id)}
                          data-ocid={`notifications.item.${idx + 1}`}
                          onClick={() => handleMarkRead(notif.id)}
                          className={`w-full text-left px-4 py-3 hover:bg-secondary/60 transition-colors ${
                            !notif.isRead
                              ? "shadow-[inset_2px_0_0_oklch(0.78_0.18_68)]"
                              : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span
                              className={`font-mono text-[10px] uppercase tracking-wider ${getCategoryColor(notif.category)}`}
                            >
                              {notif.category}
                            </span>
                            <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0 tabular-nums">
                              {relativeTime(notif.timestamp)}
                            </span>
                          </div>
                          <p
                            className={`text-xs leading-relaxed ${notif.isRead ? "text-muted-foreground" : "text-foreground"}`}
                          >
                            {notif.message}
                          </p>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
