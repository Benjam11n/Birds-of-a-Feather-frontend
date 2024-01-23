import { createCommunity as createCommunityApi } from "@/services/apiCommunities";
import { community } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateCommunity() {
  const queryClient = useQueryClient();
  const queryKey = ["communities"];

  const { mutate: createCommunity, status } = useMutation({
    mutationFn: createCommunityApi,
    onMutate: async (newCommunity: community) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousCommunities =
        queryClient.getQueryData<community[]>(queryKey);

      const updatedArray = [...(previousCommunities || [])];
      updatedArray.push(newCommunity);
      queryClient.setQueryData(queryKey, updatedArray);

      return { previousCommunities };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, () => context?.previousCommunities);
      toast.error("Error creating community");
    },
    onSettled: () => {
      toast.success("Community successfully created");

      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { createCommunity, status };
}
