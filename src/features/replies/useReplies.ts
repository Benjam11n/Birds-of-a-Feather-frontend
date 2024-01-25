import { useQuery } from "@tanstack/react-query";
import { getReplies } from "../../services/apiReplies";
import { reply } from "@/types/allTypes";

export function useReplies(parentId: number) {
  const {
    data: replies,
    isLoading,
    error,
  } = useQuery<reply[], Error>({
    queryKey: ["replies", parentId],
    queryFn: () => getReplies(parentId),
  });

  return { isLoading, error, replies };
}
