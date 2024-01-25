import { getUserCommunities } from "@/services/apiUsers";
import { community } from "@/types/allTypes";
import { useQuery } from "@tanstack/react-query";

export function useUserCommunities() {
  const {
    data: communities,
    isLoading,
    error,
  } = useQuery<community[], Error>({
    queryKey: ["userCommunities"],
    queryFn: getUserCommunities,
  });

  return { communities, isLoading, error };
}
