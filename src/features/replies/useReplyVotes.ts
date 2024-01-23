import { getReplyVotes } from "@/services/apiReplies";
import { replyVote } from "@/types/allTypes";
import { useQuery } from "@tanstack/react-query";

export function useReplyVotes(replyId: number) {
  const {
    isLoading,
    data: replyVotes,
    error,
  } = useQuery<replyVote[], Error, replyVote[], (string | number)[]>({
    queryKey: ["replyVotes", replyId],
    queryFn: () => getReplyVotes(replyId),
  });

  return { isLoading, replyVotes, error };
}
