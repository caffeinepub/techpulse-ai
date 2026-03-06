import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import ArticleFeed from "./components/ArticleFeed";
import LiveIndex from "./components/LiveIndex";
import Navbar from "./components/Navbar";
import TrendingTopics from "./components/TrendingTopics";

export default function App() {
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const triggerRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["articles"] });
    await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    await queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    await queryClient.invalidateQueries({ queryKey: ["trending"] });
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 1000);
  }, [queryClient]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      triggerRefresh();
    }, 60_000);
    return () => clearInterval(interval);
  }, [triggerRefresh]);

  const handleTopicClick = (topic: string) => {
    setSearch(topic);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col noise-overlay">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.25 0.015 265 / 0.15) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.25 0.015 265 / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top gradient fade */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent pointer-events-none z-40" />

      <Navbar
        search={search}
        onSearchChange={setSearch}
        lastUpdated={lastUpdated}
        isRefreshing={isRefreshing}
      />

      <main className="flex-1 relative z-10">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-6">
          {/* Ticker bar */}
          <div className="flex items-center gap-3 mb-6 overflow-hidden bg-secondary/40 border border-border/50 rounded-sm px-3 py-2">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
              </div>
              <span className="font-mono text-[10px] font-bold text-live tracking-widest uppercase">
                Live
              </span>
            </div>
            <Separator orientation="vertical" className="h-4 bg-border/60" />
            <div className="overflow-hidden flex-1">
              <div className="flex gap-8 animate-[ticker_30s_linear_infinite] whitespace-nowrap">
                {[
                  "GPT-5 Launch Confirmed",
                  "NVIDIA B200 Ships to AWS",
                  "Anthropic Claude 3.7 Extended Thinking",
                  "Mistral $600M Series B",
                  "AlphaFold 3 RNA Prediction",
                  "EU AI Act August Deadline",
                  "Linux 6.9 Rust Drivers",
                  "Sam Altman Senate Testimony",
                ].map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[10px] text-muted-foreground tracking-wide shrink-0"
                  >
                    <span className="text-amber mr-1.5">▸</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main feed (2/3) */}
            <div className="flex-1 min-w-0 lg:flex-[2]">
              <div className="flex items-baseline gap-2 mb-4">
                <h1 className="font-display text-base font-bold text-foreground tracking-tight">
                  Intelligence Feed
                </h1>
                <span className="font-mono text-[10px] text-muted-foreground/60 tracking-wider uppercase">
                  / AI &amp; Tech
                </span>
              </div>
              <ArticleFeed search={search} />
            </div>

            {/* Sidebar (1/3) */}
            <aside className="lg:flex-[1] flex flex-col gap-4 min-w-0 lg:min-w-[280px] lg:max-w-[340px]">
              {/* Live Index panel */}
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <LiveIndex />
              </div>

              {/* Trending Topics panel */}
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <TrendingTopics onTopicClick={handleTopicClick} />
              </div>

              {/* Stats panel */}
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <div className="px-3 py-2.5 border-b border-border/60">
                  <span className="font-display text-xs font-bold tracking-wide text-foreground uppercase">
                    Coverage Index
                  </span>
                </div>
                <div className="p-3 grid grid-cols-2 gap-2">
                  {[
                    { label: "Sources", value: "247" },
                    { label: "Articles Today", value: "1,842" },
                    { label: "Topics Tracked", value: "3,400+" },
                    { label: "Update Freq", value: "60s" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="bg-secondary/40 border border-border/40 rounded-sm p-2"
                    >
                      <div className="font-mono text-base font-bold text-amber tabular-nums">
                        {value}
                      </div>
                      <div className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-wider mt-0.5">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-background/80 py-4 px-6 mt-auto">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-display text-xs font-semibold text-foreground">
              TechPulse<span className="text-amber">AI</span>
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/50">
              — AI &amp; Technology Intelligence
            </span>
          </div>
          <p className="font-mono text-[10px] text-muted-foreground/50">
            © {new Date().getFullYear()}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber/70 hover:text-amber transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
