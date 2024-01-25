import { updateCommunity as updateCommunityApi } from "@/services/apiCommunities";
import { newCommunity } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useUpdateCommunity(communityId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["communities", communityId];

  const { mutate: updateCommunity, status } = useMutation<
    void,
    Error,
    {
      communityId: number;
      newCommunity: newCommunity;
    }
  >({
    mutationFn: updateCommunityApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Community updated successfully");
    },
  });

  return { updateCommunity, status };
}
