import toast from "react-hot-toast";
import { deleteFollow as deleteFollowApi } from "../../services/apiFollows";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { users } from "@/types/allTypes";

export function useDeleteFollow(followeeId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["follows"];

  const { mutate: deleteFollow, status } = useMutation<
    void,
    Error,
    number,
    { previousFollowings: users[] }
  >({
    mutationFn: deleteFollowApi,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousFollowings = queryClient.getQueryData<users[]>(queryKey);

      const followingsArray = [...(previousFollowings || [])];

      const updatedArray = followingsArray.filter(
        (user: users) => user.ID !== followeeId
      );

      queryClient.setQueryData(queryKey, updatedArray);

      return { previousFollowings: updatedArray };
    },
    onSuccess: () => {
      toast.success("Unfollowed successfully.");
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, () => context?.previousFollowings);
      toast.error("Failed to unfollow. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { deleteFollow, status };
}
