import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "motion/react";
import type { Notification } from "../backend.d";
import { useMarkNotificationRead, useNotifications } from "../hooks/useQueries";
import { sampleNotifications } from "../utils/sampleData";
import { relativeTime } from "../utils/timeUtils";

const CATEGORY_COLORS: Record<string, string> = {
  AI: "text-amber border-amber/40 bg-amber/10",
  Hardware: "text-cyan-400 border-cyan-400/40 bg-cyan-400/10",
  Software: "text-green-400 border-green-400/40 bg-green-400/10",
  Research: "text-purple-400 border-purple-400/40 bg-purple-400/10",
  Startups: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  ML: "text-pink-400 border-pink-400/40 bg-pink-400/10",
};

function getCategoryStyle(cat: string) {
  return (
    CATEGORY_COLORS[cat] ||
    "text-muted-foreground border-border bg-secondary/30"
  );
}

export default function LiveIndex() {
  const { data: notifications, isLoading } = useNotifications();
  const markRead = useMarkNotificationRead();

  const displayNotifications: Notification[] =
    notifications && notifications.length > 0
      ? notifications
      : sampleNotifications;

  const sorted = [...displayNotifications].sort((a, b) =>
    Number(b.timestamp - a.timestamp),
  );

  const handleClick = (id: bigint) => {
    markRead.mutate(id);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border/60 shrink-0">
        <div className="relative flex items-center justify-center w-2.5 h-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-live opacity-40 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-live glow-live animate-pulse-live" />
        </div>
        <span className="font-display text-xs font-bold tracking-wide text-foreground uppercase">
          Live Index
        </span>
        <span className="ml-auto font-mono text-[9px] text-live tracking-widest animate-pulse-live">
          LIVE
        </span>
      </div>

      {/* Loading */}
      {isLoading && (
        <div data-ocid="notifications.loading_state" className="p-3 space-y-2">
          {Array.from({ length: 5 }, (_, i) => `notif-skel-${i}`).map((key) => (
            <div
              key={key}
              className="space-y-1.5 py-2 border-b border-border/40"
            >
              <Skeleton className="h-2.5 w-16 bg-muted" />
              <Skeleton className="h-3 w-full bg-muted" />
              <Skeleton className="h-3 w-4/5 bg-muted" />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && sorted.length === 0 && (
        <div
          data-ocid="notifications.empty_state"
          className="flex flex-col items-center justify-center flex-1 py-8 text-center px-4"
        >
          <span className="font-mono text-2xl text-muted-foreground/30 mb-2">
            —
          </span>
          <p className="font-mono text-xs text-muted-foreground/60">
            No notifications yet
          </p>
        </div>
      )}

      {/* Notification list */}
      {!isLoading && sorted.length > 0 && (
        <ScrollArea className="flex-1 terminal-scroll">
          <AnimatePresence initial={false}>
            <div className="divide-y divide-border/30">
              {sorted.map((notif, idx) => (
                <motion.button
                  type="button"
                  key={String(notif.id)}
                  data-ocid={`notifications.item.${idx + 1}`}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.2 }}
                  onClick={() => handleClick(notif.id)}
                  className={`w-full text-left px-3 py-2.5 hover:bg-secondary/50 transition-colors group
                    ${!notif.isRead ? "shadow-[inset_2px_0_0_oklch(0.78_0.18_68)]" : ""}`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`font-mono text-[9px] px-1.5 py-0.5 rounded-sm border font-medium uppercase tracking-wider ${getCategoryStyle(notif.category)}`}
                    >
                      {notif.category}
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground/50 tabular-nums">
                      {relativeTime(notif.timestamp)}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] leading-relaxed ${notif.isRead ? "text-muted-foreground" : "text-foreground"} group-hover:text-foreground transition-colors`}
                  >
                    {notif.message}
                  </p>
                  {!notif.isRead && (
                    <div className="mt-1 flex items-center gap-1">
                      <div className="h-px flex-1 bg-border/30" />
                      <span className="font-mono text-[8px] text-muted-foreground/40">
                        click to mark read
                      </span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </AnimatePresence>
        </ScrollArea>
      )}
    </div>
  );
}
