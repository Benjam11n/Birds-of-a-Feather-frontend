import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReply as createReplyApi } from "../../services/apiReplies";
import toast from "react-hot-toast";
import { newReply } from "@/types/allTypes";

export function useCreateReply(parentId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["replies", parentId];

  const { mutate: createReply, status } = useMutation({
    mutationFn: createReplyApi,
    onMutate: async (newReply: newReply) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousReplies = queryClient.getQueryData<newReply[]>(queryKey);

      const repliesArray = [...(previousReplies || [])];
      repliesArray.push(newReply);

      // optimistic update
      queryClient.setQueryData(queryKey, repliesArray);

      return { previousReplies };
    },
    onError: (_, __, context) => {
      // set data back to original state if error occurs
      queryClient.setQueryData(queryKey, () => context?.previousReplies);
      // display error toast
      toast.error("Failed to create reply.");
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

  return { createReply, status };
}
