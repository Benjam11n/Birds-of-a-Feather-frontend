import { getUserCommunities } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";

export function useUserCommunities() {
  const {
    data: communities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userCommunities"],
    queryFn: getUserCommunities,
  });

  return { communities, isLoading, error };
}
