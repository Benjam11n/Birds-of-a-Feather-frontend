import { getCommunity } from "@/services/apiCommunities";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useCommunity() {
  const { communityId } = useParams();

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
