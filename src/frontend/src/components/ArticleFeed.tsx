import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useState } from "react";
import type { Article } from "../backend.d";
import { useArticles } from "../hooks/useQueries";
import { sampleArticles } from "../utils/sampleData";
import ArticleCard from "./ArticleCard";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "AI", value: "AI" },
  { label: "ML", value: "ML" },
  { label: "Software", value: "Software" },
  { label: "Hardware", value: "Hardware" },
  { label: "Startups", value: "Startups" },
  { label: "Research", value: "Research" },
];

interface ArticleFeedProps {
  search: string;
}

export default function ArticleFeed({ search }: ArticleFeedProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryParam = activeCategory === "all" ? null : activeCategory;
  const searchParam = search.trim() === "" ? null : search.trim();

  const { data: fetchedArticles, isLoading } = useArticles(
    categoryParam,
    searchParam,
  );

  // Use fetched data if available, otherwise fall back to sample data
  let articles: Article[] = [];
  if (fetchedArticles && fetchedArticles.length > 0) {
    articles = fetchedArticles;
  } else if (!isLoading) {
    // Filter sample data based on category and search
    articles = sampleArticles.filter((a) => {
      const matchCat =
        activeCategory === "all" || a.category === activeCategory;
      const matchSearch =
        !search.trim() ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.summary.toLowerCase().includes(search.toLowerCase()) ||
        a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        a.source.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  return (
    <section className="flex flex-col gap-4 min-w-0">
      {/* Category tabs */}
      <div className="flex items-center justify-between">
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className="h-8 bg-secondary/60 border border-border/50 rounded-sm p-0.5 gap-0.5 w-full overflow-x-auto flex justify-start">
            {CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                data-ocid="feed.tab"
                className="h-7 px-3 text-xs font-mono font-medium rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none text-muted-foreground shrink-0"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div
          data-ocid="feed.loading_state"
          className="grid grid-cols-1 lg:grid-cols-2 gap-3"
        >
          {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((key) => (
            <div
              key={key}
              className="bg-card border border-border rounded-sm p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-24 bg-muted" />
                <Skeleton className="h-4 w-16 bg-muted rounded-sm" />
              </div>
              <Skeleton className="h-4 w-full bg-muted" />
              <Skeleton className="h-4 w-4/5 bg-muted" />
              <Skeleton className="h-3 w-full bg-muted" />
              <Skeleton className="h-3 w-3/4 bg-muted" />
              <div className="flex gap-1">
                <Skeleton className="h-4 w-12 bg-muted rounded-sm" />
                <Skeleton className="h-4 w-16 bg-muted rounded-sm" />
                <Skeleton className="h-4 w-10 bg-muted rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && articles.length === 0 && (
        <motion.div
          data-ocid="feed.empty_state"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 border border-dashed border-border/50 rounded-sm bg-card/30"
        >
          <div className="font-mono text-4xl mb-4 text-muted-foreground/30">
            [ ]
          </div>
          <p className="font-display text-sm font-semibold text-muted-foreground mb-1">
            No articles found
          </p>
          <p className="font-mono text-xs text-muted-foreground/60">
            Try a different search query or category
          </p>
        </motion.div>
      )}

      {/* Article grid */}
      {!isLoading && articles.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {articles.map((article, idx) => (
            <ArticleCard
              key={String(article.id)}
              article={article}
              index={idx}
            />
          ))}
        </div>
      )}
    </section>
  );
}
