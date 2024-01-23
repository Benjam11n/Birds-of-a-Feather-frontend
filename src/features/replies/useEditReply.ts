import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editReply as editReplyApi } from "../../services/apiReplies";
import toast from "react-hot-toast";
import { reply, newReply } from "@/types/allTypes";

interface EditReplyProps {
  replyId: number;
  newReply: newReply;
}

export function useEditReply(parentId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["replies", parentId];

  const { mutate: editReply, status } = useMutation<
    void,
    { previousReplies: reply[] },
    EditReplyProps,
    { previousReplies: reply[] }
  >({
    mutationFn: editReplyApi,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousReplies: reply[] =
        queryClient.getQueryData<reply[]>(queryKey) || [];

      const repliesArray = [...(previousReplies || [])];
      const updatedArray = repliesArray.map((reply: reply) =>
        reply.ID === variables.replyId ? variables.newReply : reply
      );
      toast.success("Reply successfully edited.");

      queryClient.setQueryData(queryKey, updatedArray);

      return { previousReplies };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, () => context?.previousReplies);
      // display error toast
      toast.error("Failed to update reply.");
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

  return { editReply, status };
}
