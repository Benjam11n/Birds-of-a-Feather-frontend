import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteReply as deleteReplyApi } from "../../services/apiReplies";
import { reply } from "@/types/allTypes";

export function useDeleteReply(parentId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["replies", parentId];

  const { mutate: deleteReply, status } = useMutation({
    mutationFn: deleteReplyApi,
    onMutate: async ({ replyId }: { replyId: number }) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousReplies = queryClient.getQueryData<reply[]>(queryKey);

      const postsArray = [...(previousReplies || [])];

      const updatedArray = postsArray.filter(
        (reply: reply) => reply.ID !== replyId
      );

      queryClient.setQueryData(queryKey, updatedArray);
      toast.success("Reply successfully deleted.");

      return { previousReplies };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, () => context?.previousReplies);
      // display error toast
      toast.error("Failed to delete reply.");
    },
    onSuccess: () => {
      // display success toast
      toast.success("Reply successfully updated.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { deleteReply, status };
}
