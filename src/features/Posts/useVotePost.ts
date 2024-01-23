import { postVote } from "@/types/allTypes";
import { votePost as votePostApi } from "../../services/apiPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useVotePost(postId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["postVotes", postId];

  const { mutate: votePost, status } = useMutation({
    mutationFn: votePostApi,
    onMutate: async (newVotePost: postVote) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousVotes = queryClient.getQueryData<postVote[]>(queryKey);

      const votesArray = [...(previousVotes || [])];
      votesArray.push(newVotePost);

      // optimistic updates
      queryClient.setQueryData(queryKey, votesArray);

      return { previousVotes };
    },
    onError: (_, __, context) => {
      // set data back to original state if error occurs
      queryClient.setQueryData(queryKey, () => context?.previousVotes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return { votePost, status };
}
