import { useQuery } from "@tanstack/react-query";
import { getAllReplies } from "../../services/apiReplies";

function useAllReplies() {
  const {
    data: replies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allReplies"],
    queryFn: getAllReplies,
  });

  return { isLoading, error, replies };
}

export default useAllReplies;
