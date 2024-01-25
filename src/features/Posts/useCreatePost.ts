import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost as createPostApi } from "../../services/apiPosts";
import toast from "react-hot-toast";
import { newPost } from "@/types/allTypes";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const queryKey = ["posts"];

  const { mutate: createPost, status } = useMutation<
    void,
    Error,
    newPost,
    { previousPosts: newPost[] | undefined }
  >({
    mutationFn: createPostApi,
    onMutate: async (newPost: newPost) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousPosts = queryClient.getQueryData<newPost[]>(queryKey);

      const postsArray = [...(previousPosts || [])];
      postsArray.push(newPost);

      // optimistic updates
      queryClient.setQueryData(queryKey, postsArray);

      return { previousPosts };
    },
    onError: (_, __, context) => {
      // set data back to original state if error occurs
      queryClient.setQueryData(queryKey, () => context?.previousPosts);
      toast.error("Failed to create post. Please try again.");
    },
    onSuccess: () => {
      // display success toast
      toast.success("Post successfully created.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { createPost, status };
}
