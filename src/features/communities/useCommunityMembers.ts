import { getCommunityMembers } from "@/services/apiCommunities";
import { useQuery } from "@tanstack/react-query";

export function useCommunityMembers(communityId: number) {
  const {
    isLoading,
    data: communityMembers,
    error,
  } = useQuery({
    queryKey: ["communityMembers", communityId],
    queryFn: () => getCommunityMembers(Number(communityId)),
  });

  return { isLoading, error, communityMembers };
}
