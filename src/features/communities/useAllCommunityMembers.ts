import { getAllCommunityMembers } from "@/services/apiCommunities";
import { useQuery } from "@tanstack/react-query";

export function useAllCommuntiyMembers() {
  const {
    isLoading,
    data: communityMembers,
    error,
  } = useQuery({
    queryKey: ["communityMembers"],
    queryFn: () => getAllCommunityMembers(),
  });

  return { isLoading, error, communityMembers };
}
