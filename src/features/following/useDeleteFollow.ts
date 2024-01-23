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

      toast.success("Unfollowed successfully");

      return { previousFollowings: updatedArray };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, () => context?.previousFollowings);
      toast.error("Error deleting user");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { deleteFollow, status };
}
