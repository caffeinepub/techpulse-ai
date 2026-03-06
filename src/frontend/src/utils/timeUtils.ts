/**
 * Convert a nanosecond bigint timestamp (ICP) to a relative time string
 */
export function relativeTime(nanoTimestamp: bigint): string {
  const ms = Number(nanoTimestamp / BigInt(1_000_000));
  const now = Date.now();
  const diff = now - ms;

  if (diff < 0) return "just now";

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  const date = new Date(ms);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Format a nanosecond bigint timestamp to a readable date string
 */
export function formatDate(nanoTimestamp: bigint): string {
  const ms = Number(nanoTimestamp / BigInt(1_000_000));
  const date = new Date(ms);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format last updated time from a Date object
 */
export function formatLastUpdated(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
