import { updateUser as updateUserApi } from "@/services/apiUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, status } = useMutation({
    mutationFn: updateUserApi,
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

  return { updateUser, status };
}
