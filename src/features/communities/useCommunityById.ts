import { getCommunity } from "@/services/apiCommunities";
import { useQuery } from "@tanstack/react-query";

export function useCommunityById(communityId: number) {
  const {
    isLoading,
    data: community,
    error,
  } = useQuery({
    queryKey: ["communities", Number(communityId)],
    queryFn: () => getCommunity(Number(communityId)),
    retry: false,
  });

  return { isLoading, error, community };
}
