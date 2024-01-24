import { deleteCommunityMember } from "@/services/apiCommunities";
import { communityMember } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUnfollowCommunity(communityId: number, userId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["communityMembers", communityId];

  const { mutate: unfollowCommunity, status } = useMutation({
    mutationFn: deleteCommunityMember,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousCommunityMemmbers =
        queryClient.getQueryData<communityMember[]>(queryKey);

      const communityMembersArray = [...(previousCommunityMemmbers || [])];

      const updatedArray = communityMembersArray.filter(
        (communityMember: communityMember) => communityMember.userId !== userId
      );

      // optimistc update
      queryClient.setQueryData(queryKey, updatedArray);

      return { previousCommunityMemmbers };
    },
    onError: (_, __, context) => {
      // set data back to original state if error occured
      queryClient.setQueryData(
        queryKey,
        () => context?.previousCommunityMemmbers
      );
      toast.error("Failed to unfollow community");
    },
    onSuccess: () => {
      toast.success("Unfollowed successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { unfollowCommunity, status };
}
