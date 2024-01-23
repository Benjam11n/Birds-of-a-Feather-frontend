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

      queryClient.setQueryData(queryKey, updatedArray);

      return { previousCommunityMemmbers };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        queryKey,
        () => context?.previousCommunityMemmbers
      );
      toast.error("Error deleting communityMember");
    },
    onSettled: () => {
      toast.success("deleted successfully");

      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { unfollowCommunity, status };
}
