import { useQuery } from "@tanstack/react-query";
import { getFollowings } from "../../services/apiFollows";
import { users } from "../../types/allTypes";

export function useFollowing() {
  const {
    data: followings,
    isLoading,
    error,
  } = useQuery<users[], Error>({
    queryKey: ["follows"],
    queryFn: getFollowings,
  });

  return { followings, isLoading, error };
}
