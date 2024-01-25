import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../services/apiPosts";
import { post } from "@/types/allTypes";

export function usePost(postId: number) {
  const {
    isLoading,
    data: post,
    error,
  } = useQuery<post, Error>({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });
  return { isLoading, error, post };
}
