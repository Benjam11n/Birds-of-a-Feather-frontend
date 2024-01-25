import { logOut as logOutApi } from "@/services/apiUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logOut, status } = useMutation<void, Error, void>({
    mutationFn: logOutApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      // navigate to the login page and create toast notification
      navigate("/login", { replace: true });
      toast.success("Successfully logged out");
    },
    onError: (err) => {
      toast.error("Failed to logout");
      console.log(err);
    },
  });

  return { logOut, status };
}
