import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiAuth";

export function useGetUser() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });

  return { users, isLoading, error };
}
