import toast from "react-hot-toast";
import { editPost as editPostApi } from "../../services/apiPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newPost, post } from "@/types/allTypes";

export function useEditPost() {
  const queryClient = useQueryClient();
  const queryKey = ["posts"];

  const { mutate: editPost, status } = useMutation<
    void,
    Error,
    {
      id: number;
      newPost: newPost;
    },
    { previousPosts: post[] | undefined }
  >({
    mutationFn: editPostApi,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousPosts = queryClient.getQueryData<post[]>(queryKey);

      const postsArray = [...(previousPosts || [])];
      const updatedArray = postsArray.map((post: post) =>
        post.postId === variables.id ? variables.newPost : post
      );

      // optimistic updates
      queryClient.setQueryData(queryKey, updatedArray);

      return { previousPosts };
    },
    onError: (__, _, context) => {
      // set data back to original state if error occurs
      queryClient.setQueryData(queryKey, () => context?.previousPosts);

      // display error toast
      toast.error("Failed to update post. Please try again.");
    },
    onSuccess: () => {
      // display success toast
      toast.success("Post successfully updated.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { editPost, status };
}
