import { getAllCommunityMembers } from "@/services/apiCommunities";
import { communityMember } from "@/types/allTypes";
import { useQuery } from "@tanstack/react-query";

export function useAllCommunityMembers() {
  const {
    isLoading,
    data: communityMembers,
    error,
  } = useQuery<communityMember[], Error>({
    queryKey: ["communityMembers"],
    queryFn: () => getAllCommunityMembers(),
  });

  return { isLoading, error, communityMembers };
}
