import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostVote as updatePostApi } from "../../services/apiPosts";
import { postVote } from "@/types/allTypes";

export function useUpdatePostVote(postId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["postVotes", postId];

  const { mutate: updatePostVote, status } = useMutation({
    mutationFn: updatePostApi,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousVotes = queryClient.getQueryData<postVote[]>(queryKey);

      const votesArray = [...(previousVotes || [])];
      const updatedArray = votesArray.map((postVote: postVote) =>
        postVote.userId === variables.postVote.userId
          ? variables.postVote
          : postVote
      );

      queryClient.setQueryData(queryKey, updatedArray);

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

  return { updatePostVote, status };
}
