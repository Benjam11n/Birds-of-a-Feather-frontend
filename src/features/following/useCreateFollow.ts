import toast from "react-hot-toast";
import { createFollow as createFollowApi } from "../../services/apiFollows";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { users } from "@/types/allTypes";

export function useCreateFollow() {
  const queryClient = useQueryClient();
  const queryKey = ["follows"];

  const { mutate: createFollow, status } = useMutation<void, Error, number>({
    mutationFn: createFollowApi,
    onMutate: async (followeeId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousFollows = queryClient.getQueryData<users[]>(queryKey);

      const updatedArray = [...(previousFollows || [])];
      const newFollow = {
        userId: followeeId,
        createdAt: new Date().toISOString(),
      };
      updatedArray.push(newFollow);
      queryClient.setQueryData(queryKey, updatedArray);
      toast.success("Followed successfully");

      return { previousFollows };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, () => context?.previousFollows);
      toast.error("Error creating follows");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["follows"],
      });
    },
  });

  return { createFollow, status };
}
