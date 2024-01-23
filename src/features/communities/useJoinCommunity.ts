import { createCommunityMember } from "@/services/apiCommunities";
import { communityMember } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useJoinCommunity(communityId: number, userId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["communityMembers", communityId];

  const { mutate: joinCommunity, status } = useMutation({
    mutationFn: createCommunityMember,
    onMutate: async (communityId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousCommunityMembers =
        queryClient.getQueryData<communityMember[]>(queryKey);

      const communityMembersArray = [...(previousCommunityMembers || [])];
      communityMembersArray.push({
        userId: userId,
        communityId: communityId,
      });

      queryClient.setQueryData(queryKey, communityMembersArray);

      return { previousCommunityMembers };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        queryKey,
        () => context?.previousCommunityMembers
      );
      toast.error("Error joining community");
    },
    onSettled: () => {
      toast.success("Joined successfully created");

      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { joinCommunity, status };
}
