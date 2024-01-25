import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";
import { post } from "@/types/allTypes";
// import { PAGE_SIZE } from "../../utils/constants";

export function usePosts() {
  // const queryClient = useQueryClient();
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery<post[], Error>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  // my attempt at prefetching posts
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
