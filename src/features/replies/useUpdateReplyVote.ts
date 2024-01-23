import { updateReplyVote as updateReplyVoteApi } from "@/services/apiReplies";
import { replyVote } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateReplyVote(replyId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["replyVotes", replyId];

  const { mutate: updateReplyVote, status } = useMutation({
    mutationFn: updateReplyVoteApi,
    onMutate: async (replyVoteInput) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousVotes = queryClient.getQueryData<replyVote[]>(queryKey);

      const votesArray = [...(previousVotes || [])];
      const updatedArray = votesArray.map((replyVote: replyVote) =>
        replyVote.userId === replyVoteInput.userId ? replyVoteInput : replyVote
      );

      // optimistic update
      queryClient.setQueryData(queryKey, updatedArray);

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
  return { updateReplyVote, status };
}
