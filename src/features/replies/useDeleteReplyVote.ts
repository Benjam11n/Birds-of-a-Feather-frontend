import { deleteReplyVote as deleteReplyApi } from "@/services/apiReplies";
import { replyVote } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteReplyVote(replyId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["replyVotes", replyId];

  const { mutate: deleteReplyVote, status } = useMutation({
    mutationFn: deleteReplyApi,
    onMutate: async (replyId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousVotes = queryClient.getQueryData<replyVote[]>(queryKey);

      const votesArray = [...(previousVotes || [])];

      const updatedArray = votesArray.filter(
        (replyVote: replyVote) => replyVote.replyId !== replyId
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
  return { deleteReplyVote, status };
}
