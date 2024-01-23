import toast from "react-hot-toast";
import { createFollow as createFollowApi } from "../../services/apiFollows";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFollow() {
  const queryClient = useQueryClient();
  const queryKey = ["follows"];

  const { mutate: createFollow, status } = useMutation<
    void,
    Error,
    number,
    { previousfollows: { userId: number; createdAt: string }[] }
  >({
    mutationFn: createFollowApi,
    onMutate: async (followeeId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousFollows =
        queryClient.getQueryData<{ userId: number; createdAt: string }[]>(
          queryKey
        );

      const updatedArray = [...(previousFollows || [])];
      const newFollow = {
        userId: followeeId,
        createdAt: new Date().toISOString(),
      };
      updatedArray.push(newFollow);
      queryClient.setQueryData(queryKey, updatedArray);
      toast.success("Followed successfully");

      // Return an object with the correct property name
      return { previousfollows: updatedArray };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, () => context?.previousfollows);
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
