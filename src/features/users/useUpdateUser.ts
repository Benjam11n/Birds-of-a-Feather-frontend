import { updateUser as updateUserApi } from "@/services/apiUsers";
import { newUser } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, status } = useMutation<
    void,
    Error,
    {
      userId: number;
      newUser: newUser;
    }
  >({
    mutationFn: updateUserApi,
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

  return { updateUser, status };
}
