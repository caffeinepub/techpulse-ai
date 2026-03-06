import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Notification {
    id: bigint;
    isRead: boolean;
    message: string;
    timestamp: bigint;
    category: string;
}
export interface Article {
    id: bigint;
    url: string;
    title: string;
    source: string;
    tags: Array<string>;
    publishedAt: bigint;
    isBreaking: boolean;
    summary: string;
    category: string;
}
export interface backendInterface {
    getArticleById(id: bigint): Promise<Article | null>;
    getArticles(category: string | null, search: string | null): Promise<Array<Article>>;
    getNotifications(): Promise<Array<Notification>>;
    getTrendingTopics(): Promise<Array<string>>;
    getUnreadNotificationCount(): Promise<bigint>;
    markNotificationRead(id: bigint): Promise<boolean>;
}
