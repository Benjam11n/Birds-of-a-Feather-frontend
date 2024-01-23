import { useQuery } from "@tanstack/react-query";
import { getReplies } from "../../services/apiReplies";

export function useReplies(parentId: number) {
  const {
    data: replies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["replies", parentId],
    queryFn: () => getReplies(parentId),
  });

  return { isLoading, error, replies };
}
