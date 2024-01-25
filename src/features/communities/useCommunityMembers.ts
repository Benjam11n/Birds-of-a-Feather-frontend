import { getCommunityMembers } from "@/services/apiCommunities";
import { communityMember } from "@/types/allTypes";
import { useQuery } from "@tanstack/react-query";

export function useCommunityMembers(communityId: number) {
  const {
    isLoading,
    data: communityMembers,
    error,
  } = useQuery<communityMember[], Error>({
    queryKey: ["communityMembers", communityId],
    queryFn: () => getCommunityMembers(Number(communityId)),
  });

  return { isLoading, error, communityMembers };
}
