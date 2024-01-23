import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostVote as deletePostApi } from "../../services/apiPosts";
import { postVote } from "@/types/allTypes";

export function useDeletePostVote(postId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["postVotes", postId];

  const { mutate: deletePostVote, status } = useMutation({
    mutationFn: deletePostApi,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousVotes = queryClient.getQueryData<postVote[]>(queryKey);

      const votesArray = [...(previousVotes || [])];

      const updatedArray = votesArray.filter(
        (postVote: postVote) => postVote.postId !== id
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

  return { deletePostVote, status };
}
