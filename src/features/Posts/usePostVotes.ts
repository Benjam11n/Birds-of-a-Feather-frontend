import { useQuery } from "@tanstack/react-query";
import { getPostVotes } from "../../services/apiPosts";
import { postVote } from "@/types/allTypes";

export function usePostVotes(postId: number) {
  const {
    isLoading,
    data: postVotes,
    error,
  } = useQuery<postVote[], Error, postVote[], (string | number)[]>({
    queryKey: ["postVotes", postId],
    queryFn: () => getPostVotes(postId),
  });

  return { isLoading, postVotes, error };
}
