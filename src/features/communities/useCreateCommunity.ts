import { createCommunity as createCommunityApi } from "@/services/apiCommunities";
import { newCommunity } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ContextType {
  previousCommunities?: newCommunity[];
}

export function useCreateCommunity() {
  const queryClient = useQueryClient();
  const queryKey = ["communities"];

  const { mutate: createCommunity, status } = useMutation<
    void,
    Error,
    newCommunity,
    ContextType
  >({
    mutationFn: createCommunityApi,
    onMutate: async (newCommunity: newCommunity) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousCommunities =
        queryClient.getQueryData<newCommunity[]>(queryKey);

      const updatedArray = [...(previousCommunities || [])];

      // optimistic updates
      updatedArray.push(newCommunity);
      queryClient.setQueryData(queryKey, updatedArray);

      return { previousCommunities };
    },
    onError: (_, __, context) => {
      // set data back to original state if error occurs
      queryClient.setQueryData(queryKey, () => context?.previousCommunities);
      toast.error("Failed to create community. Please try again.");
    },
    onSuccess: () => {
      toast.success("Community successfully created.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });

  return { createCommunity, status };
}
