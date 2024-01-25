import { getAllReplyVotes } from "@/services/apiReplies";
import { replyVote } from "@/types/allTypes";
import { useQuery } from "@tanstack/react-query";

export function useAllReplyVotes() {
  const {
    isLoading,
    data: replyVotes,
    error,
  } = useQuery<replyVote[], Error, replyVote[], (string | number)[]>({
    queryKey: ["replyVotes"],
    queryFn: () => getAllReplyVotes(),
  });

  return { isLoading, replyVotes, error };
}
