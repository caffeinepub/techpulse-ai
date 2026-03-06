import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Article } from "../backend.d";
import { formatDate, relativeTime } from "../utils/timeUtils";

interface ArticleCardProps {
  article: Article;
  index: number;
}

const CATEGORY_STYLES: Record<string, string> = {
  AI: "border-amber/50 text-amber bg-amber/10",
  ML: "border-pink-500/50 text-pink-400 bg-pink-500/10",
  Hardware: "border-cyan-500/50 text-cyan-400 bg-cyan-500/10",
  Software: "border-green-500/50 text-green-400 bg-green-500/10",
  Research: "border-purple-500/50 text-purple-400 bg-purple-500/10",
  Startups: "border-orange-500/50 text-orange-400 bg-orange-500/10",
};

function getCategoryStyle(cat: string) {
  return (
    CATEGORY_STYLES[cat] ||
    "border-border text-muted-foreground bg-secondary/50"
  );
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        data-ocid={`article.card.${index + 1}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: index * 0.04, ease: "easeOut" }}
        className={`group relative flex flex-col bg-card border border-border rounded-sm overflow-hidden
          transition-all duration-200 hover:shadow-card-hover hover:border-primary/20 cursor-pointer
          ${article.isBreaking ? "card-breaking shadow-breaking-glow border-breaking/40" : ""}
        `}
        onClick={() => setOpen(true)}
      >
        {/* Breaking badge */}
        {article.isBreaking && (
          <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-1.5 bg-destructive/15 border-b border-destructive/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
            </span>
            <span className="font-mono text-[10px] font-bold tracking-widest text-breaking uppercase">
              Breaking
            </span>
          </div>
        )}

        <div
          className={`flex flex-col flex-1 p-4 ${article.isBreaking ? "pt-9" : ""}`}
        >
          {/* Header: source + category */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="font-mono text-xs font-medium text-muted-foreground tracking-wide truncate">
              {article.source}
            </span>
            <Badge
              className={`shrink-0 text-[10px] font-mono font-medium px-1.5 py-0.5 h-auto border rounded-sm ${getCategoryStyle(article.category)}`}
            >
              {article.category}
            </Badge>
          </div>

          {/* Title */}
          <h2 className="font-display text-sm font-semibold leading-snug text-foreground mb-2.5 line-clamp-3 group-hover:text-primary transition-colors">
            {article.title}
          </h2>

          {/* Summary preview */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3 flex-1">
            {article.summary}
          </p>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {article.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 mt-auto">
            <span className="font-mono text-[10px] text-muted-foreground/60 tabular-nums">
              {relativeTime(article.publishedAt)}
            </span>
            <Button
              data-ocid={`article.open_modal_button.${index + 1}`}
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-[10px] font-mono text-muted-foreground hover:text-amber hover:bg-amber/10 border border-transparent hover:border-amber/30"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              Read Summary →
            </Button>
          </div>
        </div>
      </motion.article>

      {/* Article Detail Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          data-ocid="article.dialog"
          className="max-w-2xl bg-popover border-border/80 p-0 overflow-hidden rounded-sm"
        >
          <DialogHeader className="px-6 pt-6 pb-0">
            {/* Category + source row */}
            <div className="flex items-center gap-3 mb-3">
              <Badge
                className={`text-[10px] font-mono font-medium px-1.5 py-0.5 h-auto border rounded-sm ${getCategoryStyle(article.category)}`}
              >
                {article.category}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {article.source}
              </span>
              <span className="font-mono text-xs text-muted-foreground/50 tabular-nums ml-auto">
                {formatDate(article.publishedAt)}
              </span>
            </div>

            {article.isBreaking && (
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                </span>
                <span className="font-mono text-[10px] font-bold tracking-widest text-breaking uppercase">
                  Breaking News
                </span>
              </div>
            )}

            <DialogTitle className="font-display text-lg font-bold leading-snug text-foreground pr-8">
              {article.title}
            </DialogTitle>
          </DialogHeader>

          <Separator className="mt-4 bg-border/60" />

          <ScrollArea className="max-h-[50vh] terminal-scroll">
            <div className="px-6 py-4">
              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Full summary */}
              <div>
                <p className="data-label mb-2">Summary</p>
                <p className="text-sm text-foreground/90 leading-relaxed font-body">
                  {article.summary}
                </p>
              </div>
            </div>
          </ScrollArea>

          <Separator className="bg-border/60" />

          {/* Footer actions */}
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              data-ocid="article.link.button"
              variant="default"
              size="sm"
              className="h-8 px-4 text-xs font-mono bg-primary/90 text-primary-foreground hover:bg-primary gap-1.5"
              onClick={() =>
                window.open(article.url, "_blank", "noopener noreferrer")
              }
            >
              Read Original Article
              <ExternalLink className="w-3 h-3" />
            </Button>

            <Button
              data-ocid="article.close_button"
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs font-mono text-muted-foreground hover:text-foreground gap-1.5"
              onClick={() => setOpen(false)}
            >
              <X className="w-3 h-3" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
