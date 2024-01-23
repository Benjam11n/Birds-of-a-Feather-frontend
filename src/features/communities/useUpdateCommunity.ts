import { updateCommunity as updateCommunityApi } from "@/services/apiCommunities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useUpdateCommunity(communityId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["communities", communityId];

  const { mutate: updateCommunity, status } = useMutation({
    mutationFn: updateCommunityApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Community updated successfully");
    },
  });

  return { updateCommunity, status };
}
