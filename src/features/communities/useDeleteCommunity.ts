import { deleteCommunity as deleteCommunityApi } from "@/services/apiCommunities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useDeleteCommunity(communityId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["communities", communityId];
  const navigate = useNavigate();
  const { mutate: deleteCommunity, status } = useMutation({
    mutationFn: deleteCommunityApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      toast.success("Community deleted successfully");
      navigate("/dashboard");
    },
  });

  return { deleteCommunity, status };
}
