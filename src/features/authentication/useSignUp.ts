import { QueryClient, useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SignUpUser } from "@/types/allTypes";

export function useSignUp() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const { mutate: signUp, status } = useMutation<
    void,
    Error,
    SignUpUser,
    boolean
  >({
    mutationFn: signUpApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/login", { replace: true });
      toast.success("Successfully signed up, please log in");
    },
    onError: (err) => {
      toast.error(err.message + ", email is already in use");
    },
  });

  return { signUp, status };
}
