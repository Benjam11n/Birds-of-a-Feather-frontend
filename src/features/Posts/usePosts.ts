import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";
// import { PAGE_SIZE } from "../../utils/constants";

export function usePosts() {
  // const queryClient = useQueryClient();
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  //pre-fetching
  // IMPLEMEMENT PREFETCHING HERE
  // const pageCount = Math.ceil(posts.length / PAGE_SIZE);
  // if (page < pageCount)
  //   queryClient.prefetchQuery({
  //     queryKey: ["posts", page + 1],
  //     queryFn: () => getPosts(page + 1),
  //   });

  // if (page > pageCount)
  //   queryClient.prefetchQuery({
  //     queryKey: ["posts", page - 1],
  //     queryFn: () => getPosts(page - 1),
  //   });

  return { isLoading, error, posts };
}
