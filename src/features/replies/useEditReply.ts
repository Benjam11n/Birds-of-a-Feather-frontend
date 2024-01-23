import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editReply as editReplyApi } from "../../services/apiReplies";
import toast from "react-hot-toast";
import { Reply, newReply } from "@/types/allTypes";

interface EditReplyProps {
  replyId: number;
  newReply: newReply;
}

export function useEditReply(parentId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["replies", parentId];

  const { mutate: editReply, status } = useMutation<
    void,
    { previousReplies: Reply[] },
    EditReplyProps
  >({
    mutationFn: editReplyApi,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousReplies: Reply[] =
        queryClient.getQueryData<Reply[]>(queryKey) || [];

      const repliesArray = [...(previousReplies || [])];
      const updatedArray = repliesArray.map((reply: Reply) =>
        reply.replyId === variables.replyId ? variables.newReply : reply
      );
      toast.success("Reply successfully edited");

      queryClient.setQueryData(queryKey, updatedArray);

      return { previousReplies };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, () => context?.previousReplies);
      toast.error("Error updating reply");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { editReply, status };
}
