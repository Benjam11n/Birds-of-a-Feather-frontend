import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../services/apiPosts";

export function usePost(postId: number) {
  const {
    isLoading,
    data: post,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });
  return { isLoading, error, post };
}
