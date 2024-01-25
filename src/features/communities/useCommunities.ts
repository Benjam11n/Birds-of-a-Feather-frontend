import { getCommunities } from "@/services/apiCommunities";
import { community } from "@/types/allTypes";
import { useQuery } from "@tanstack/react-query";

export function useCommunities() {
  // const queryClient = useQueryClient();
  const {
    isLoading,
    data: communities,
    error,
  } = useQuery<community[], Error>({
    queryKey: ["communities"],
    queryFn: getCommunities,
  });

  return { isLoading, error, communities };
}
