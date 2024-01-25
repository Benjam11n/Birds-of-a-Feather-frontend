import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostVote as deletePostApi } from "../../services/apiPosts";
import { postVote } from "@/types/allTypes";

export function useDeletePostVote(postId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["postVotes", postId];

  const { mutate: deletePostVote, status } = useMutation<
    void,
    Error,
    number,
    { previousVotes: postVote[] | undefined }
  >({
    mutationFn: deletePostApi,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousVotes = queryClient.getQueryData<postVote[]>(queryKey);

      const votesArray = [...(previousVotes || [])];

      const updatedArray = votesArray.filter(
        (postVote: postVote) => postVote.postId !== id
      );

      // optimistic updates
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

  return { deletePostVote, status };
}
