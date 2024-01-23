import toast from "react-hot-toast";
import { deletePost as deletePostApi } from "../../services/apiPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/types/allTypes";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const queryKey = ["posts"];

  const { mutate: deletePost, status } = useMutation({
    mutationFn: deletePostApi,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousPosts = queryClient.getQueryData<post[]>(queryKey);

      const postsArray = [...(previousPosts || [])];

      const updatedArray = postsArray.filter(
        (post: post) => post.postId !== id
      );

      queryClient.setQueryData(queryKey, updatedArray);
      toast.success("post successfully deleted");

      return { previousPosts };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, () => context?.previousPosts);
      toast.error("Error deleting post");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { deletePost, status };
}
