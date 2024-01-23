import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost as createPostApi } from "../../services/apiPosts";
import toast from "react-hot-toast";
import { newPost } from "@/types/allTypes";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const queryKey = ["posts"];

  const { mutate: createPost, status } = useMutation({
    mutationFn: createPostApi,
    onMutate: async (newPost: newPost) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousPosts = queryClient.getQueryData<newPost[]>(queryKey);

      const postsArray = [...(previousPosts || [])];
      postsArray.push(newPost);

      toast.success("newPost successfully created");
      queryClient.setQueryData(queryKey, postsArray);

      return { previousPosts };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, () => context?.previousPosts);
      toast.error("Error creating newPost");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { createPost, status };
}
