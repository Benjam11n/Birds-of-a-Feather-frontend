import { updateUserPassword as updateUserPasswordApi } from "@/services/apiUsers";
import { newUserPassword } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUserPassword() {
  const queryClient = useQueryClient();

  const { mutate: updateUserPassword, status } = useMutation<
    void,
    Error,
    {
      userId: number;
      newUser: newUserPassword;
    }
  >({
    mutationFn: updateUserPasswordApi,
    onSuccess: () => {
      toast.success("User successfully updated.");
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
    onError: () => {
      toast.error("Unable to update user. Please try again.");
    },
  });

  return { updateUserPassword, status };
}
