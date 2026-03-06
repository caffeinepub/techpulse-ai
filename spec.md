# TechPulse AI - AI & Tech News Aggregator

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- News feed aggregating AI and tech content from curated sources (newsletters, blogs, RSS feeds)
- Article cards with title, source, date, category tag, and exhaustive AI-generated summary
- Category filters: All, AI, Machine Learning, Software, Hardware, Startups, Research
- Real-time notification index panel showing trending/breaking industry developments with timestamps
- Search functionality to filter articles by keyword
- "Trending Topics" sidebar showing hot keywords/themes in the current news cycle
- Source directory listing curated newsletters and outlets the app monitors
- Individual article detail view with full summary and original source link
- Notification badge/counter for unread developments
- Auto-refresh mechanism that simulates periodic content updates

### Modify
N/A

### Remove
N/A

## Implementation Plan

### Backend (Motoko)
- `Article` type: id, title, source, url, category, publishedAt, summary, tags, isBreaking
- `Notification` type: id, message, category, timestamp, isRead
- Store articles and notifications in stable memory
- `getArticles(category: ?Text, search: ?Text) -> [Article]` -- returns filtered articles
- `getArticleById(id: Nat) -> ?Article`
- `getNotifications() -> [Notification]`
- `markNotificationRead(id: Nat) -> Bool`
- `getUnreadNotificationCount() -> Nat`
- `getTrendingTopics() -> [Text]`
- Seed data: 20+ realistic AI/tech articles from sources like MIT Tech Review, TechCrunch, ArXiv, Wired, The Batch, Import AI, etc.
- Seed data: 10+ notifications for breaking industry news
- HTTP outcalls used to simulate fetching from external sources (backend fetches content periodically)

### Frontend
- App shell: sticky top navbar with logo, search bar, notification bell with unread count badge
- Main layout: two-column (article feed left, sidebar right)
- Article feed: card grid with category filter tabs at top
- Article card: source logo/name, headline, 2-line summary preview, category badge, timestamp, "Read More" expand
- Article detail modal: full exhaustive summary, tags, source link button
- Right sidebar: "Live Index" notification panel (scrollable list with timestamps and category chips), "Trending Topics" tag cloud
- Notification panel: bell icon opens dropdown with all notifications, mark-read on click
- Category filter tabs: All, AI, ML, Software, Hardware, Startups, Research
- Search filters article list in real-time
- Auto-refresh indicator showing last updated time
