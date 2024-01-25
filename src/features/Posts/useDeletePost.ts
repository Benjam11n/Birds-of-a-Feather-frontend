import toast from "react-hot-toast";
import { deletePost as deletePostApi } from "../../services/apiPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/types/allTypes";
import { useNavigate } from "react-router-dom";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const queryKey = ["posts"];
  const navigate = useNavigate();

  const { mutate: deletePost, status } = useMutation<
    void,
    Error,
    number,
    { previousPosts: post[] | undefined }
  >({
    mutationFn: deletePostApi,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousPosts = queryClient.getQueryData<post[]>(queryKey);

      const postsArray = [...(previousPosts || [])];

      const updatedArray = postsArray.filter(
        (post: post) => post.postId !== id
      );

      // optimistic updates
      queryClient.setQueryData(queryKey, updatedArray);

      return { previousPosts };
    },
    onError: (_, __, context) => {
      // set data back to original state if error occurs
      queryClient.setQueryData(queryKey, () => context?.previousPosts);
      toast.error("Failed to delete post. Please try again.");
    },
    onSuccess: () => {
      // display success toast
      toast.success("Post successfully deleted.");
      // navigate to the dashboard
      navigate("/dashboard", { replace: true });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { deletePost, status };
}
