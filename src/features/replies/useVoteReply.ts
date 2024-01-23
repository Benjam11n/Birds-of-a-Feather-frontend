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

      queryClient.setQueryData(queryKey, votesArray);

      return { previousVotes };
    },
    onError: (_, __, context) => {
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
