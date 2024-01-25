import { createCommunityMember } from "@/services/apiCommunities";
import { communityMember } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ContextType {
  previousCommunityMembers?: communityMember[];
}

export function useJoinCommunity(communityId: number, userId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["communityMembers", communityId];

  const { mutate: joinCommunity, status } = useMutation<
    void,
    Error,
    number,
    ContextType
  >({
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
    onSuccess: () => {
      toast.success("Successfully joined community.");
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        queryKey,
        () => context?.previousCommunityMembers
      );
      toast.error("Failed to join community. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { joinCommunity, status };
}
