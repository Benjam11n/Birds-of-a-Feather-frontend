import { replyVote } from "@/types/allTypes";
import { voteReply as voteReplyApi } from "../../services/apiReplies";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useVoteReply(replyId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["replyVotes", replyId];

  const { mutate: voteReply, status } = useMutation({
    mutationFn: voteReplyApi,
    onMutate: async (newVotePost: replyVote) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousVotes = queryClient.getQueryData<replyVote[]>(queryKey);

      const votesArray = [...(previousVotes || [])];
      votesArray.push(newVotePost);

      // optimistic update
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

  return { voteReply, status };
}
