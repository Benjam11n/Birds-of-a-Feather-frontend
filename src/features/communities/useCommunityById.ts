import { getCommunity } from "@/services/apiCommunities";
import { community } from "@/types/allTypes";
import { useQuery } from "@tanstack/react-query";

export function useCommunityById(communityId: number) {
  const {
    isLoading,
    data: community,
    error,
  } = useQuery<community, Error>({
    queryKey: ["communities", Number(communityId)],
    queryFn: () => getCommunity(Number(communityId)),
    retry: false,
  });

  return { isLoading, error, community };
}
