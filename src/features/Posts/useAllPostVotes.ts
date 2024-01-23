import { useQuery } from "@tanstack/react-query";
import { getAllPostVotes } from "../../services/apiPosts";
import { postVote } from "@/types/allTypes";

export function useAllPostVotes() {
  const {
    isLoading,
    data: postVotes,
    error,
  } = useQuery<postVote[], Error, postVote[], (string | number)[]>({
    queryKey: ["postVotes"],
    queryFn: () => getAllPostVotes(),
  });

  return { isLoading, postVotes, error };
}
