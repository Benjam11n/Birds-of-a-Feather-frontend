import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginApi } from "../../services/apiAuth";
import { LoginUser } from "@/types/allTypes";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, status } = useMutation<
    void,
    Error,
    LoginUser,
    boolean
  >({
    mutationFn: loginApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      // navigate to the dashboard and create toast notification
      navigate("/dashboard", { replace: true });
      toast.success("Successfully logged in");
    },
    onError: () => {
      toast.error("Incorrect email or password");
    },
  });

  return { login, status };
}
