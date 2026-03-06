import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Article, Notification } from "../backend.d";
import { useActor } from "./useActor";

export function useArticles(category: string | null, search: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["articles", category, search],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getArticles(category, search);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}

export function useNotifications() {
  const { actor, isFetching } = useActor();
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotifications();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 60_000,
    staleTime: 15_000,
  });
}

export function useUnreadCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["unreadCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getUnreadNotificationCount();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
    staleTime: 15_000,
  });
}

export function useTrendingTopics() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["trending"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTrendingTopics();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 120_000,
    staleTime: 60_000,
  });
}

export function useMarkNotificationRead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) return false;
      return actor.markNotificationRead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
  });
}
