import { getCommunities } from "@/services/apiCommunities";
import { useQuery } from "@tanstack/react-query";

export function useCommunities() {
  // const queryClient = useQueryClient();
  const {
    isLoading,
    data: communities,
    error,
  } = useQuery({
    queryKey: ["communities"],
    queryFn: getCommunities,
  });

  return { isLoading, error, communities };
}
