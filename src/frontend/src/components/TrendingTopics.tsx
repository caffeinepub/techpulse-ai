import { TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useTrendingTopics } from "../hooks/useQueries";
import { sampleTrendingTopics } from "../utils/sampleData";

interface TrendingTopicsProps {
  onTopicClick: (topic: string) => void;
}

export default function TrendingTopics({ onTopicClick }: TrendingTopicsProps) {
  const { data: topics } = useTrendingTopics();
  const displayTopics =
    topics && topics.length > 0 ? topics : sampleTrendingTopics;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border/60">
        <TrendingUp className="w-3 h-3 text-amber" />
        <span className="font-display text-xs font-bold tracking-wide text-foreground uppercase">
          Trending Topics
        </span>
      </div>

      {/* Topics */}
      <div className="p-3 flex flex-wrap gap-1.5">
        {displayTopics.map((topic, idx) => (
          <motion.button
            key={topic}
            data-ocid={`trending.item.${idx + 1}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.03, duration: 0.15 }}
            onClick={() => onTopicClick(topic)}
            className="font-mono text-[11px] px-2 py-1 rounded-sm border border-border/60 bg-secondary/40 text-muted-foreground
              hover:border-primary/50 hover:text-amber hover:bg-amber/10 transition-all duration-150 active:scale-95"
          >
            #{topic}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
