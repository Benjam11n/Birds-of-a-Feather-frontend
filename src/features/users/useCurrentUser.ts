import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiUsers";
import { users } from "@/types/allTypes";

export function useCurrentUser() {
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery<users, Error>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
  return { currentUser, isLoading, error };
}
