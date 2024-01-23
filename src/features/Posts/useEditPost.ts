import toast from "react-hot-toast";
import { editPost as editPostApi } from "../../services/apiPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/types/allTypes";

export function useEditPost() {
  const queryClient = useQueryClient();
  const queryKey = ["posts"];

  const { mutate: editPost, status } = useMutation({
    mutationFn: editPostApi,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousPosts = queryClient.getQueryData<post[]>(queryKey);

      const postsArray = [...(previousPosts || [])];
      const updatedArray = postsArray.map((post: post) =>
        post.postId === variables.id ? variables.newPost : post
      );
      toast.success("post successfully edited");

      queryClient.setQueryData(queryKey, updatedArray);

      return { previousPosts };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, () => context?.previousPosts);
      toast.error("Error updating post");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { editPost, status };
}
