import { updateUserAvatar as updateUserAvatarApi } from "@/services/apiUsers";
import { newUserAvatar } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUserAvatar() {
  const queryClient = useQueryClient();

  const { mutate: updateUserAvatar, status } = useMutation<
    void,
    Error,
    {
      userId: number;
      newUser: newUserAvatar;
    }
  >({
    mutationFn: updateUserAvatarApi,
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
    onError: (err) => {
      toast.error("Unable to update user " + err.message);
    },
  });

  return { updateUserAvatar, status };
}
