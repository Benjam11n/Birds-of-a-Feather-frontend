import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useCurrentUser() {
  const {
    data: currentUser,
    isLoading,
    fetchStatus,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
  return { currentUser, isLoading, fetchStatus, error };
}
