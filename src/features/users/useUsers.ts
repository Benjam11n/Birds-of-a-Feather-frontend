import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";
import { users } from "@/types/allTypes";

export function useGetUser() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<users[], Error>({
    queryKey: ["user"],
    queryFn: getUsers,
  });

  return { users, isLoading, error };
}
