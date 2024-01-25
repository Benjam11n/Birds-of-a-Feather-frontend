import { useQuery } from "@tanstack/react-query";
import { getAllReplies } from "../../services/apiReplies";
import { reply } from "@/types/allTypes";

export function useAllReplies() {
  const {
    data: replies,
    isLoading,
    error,
  } = useQuery<reply[], Error>({
    queryKey: ["allReplies"],
    queryFn: getAllReplies,
  });

  return { isLoading, error, replies };
}
