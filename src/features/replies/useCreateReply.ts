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

      queryClient.setQueryData(queryKey, repliesArray);
      toast.success("reply successfully created");

      return { previousReplies };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, () => context?.previousReplies);
      toast.error("Unable to create reply");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { createReply, status };
}
