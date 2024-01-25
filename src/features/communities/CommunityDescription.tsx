import { community } from "@/types/allTypes";
import { useCommunityMembers } from "./useCommunityMembers";
import Spinner from "@/ui/Spinner";
import { useCurrentUser } from "../users/useCurrentUser";
import useDeleteCommunity from "./useDeleteCommunity";
import ConfirmDelete from "@/ui/ConfirmDelete";
import EditCommunityModal from "./EditCommunityModal";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function CommunityDescription({ community }: { community: community }) {
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { communityMembers, isLoading } = useCommunityMembers(community.ID);
  const { deleteCommunity, status: deleteStatus } = useDeleteCommunity(
    community.ID
  );

  const isDeletingCommunity = deleteStatus === "pending";

  if (isLoading || isLoadingCurrentUser || isDeletingCommunity)
    return <Spinner />;

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <Label className="text-lg">{community.title}</Label>
      </CardHeader>
      <CardContent>{community.description}</CardContent>
      <CardFooter className="grid grid-rows-[1fr_auto]">
        <div className="text-muted-foreground mb-2">
          {communityMembers?.length || 0} members
        </div>
        {community.userId === currentUser?.ID && (
          <div className="space-x-2 mt-2">
            <EditCommunityModal communityToEdit={community} />

            <ConfirmDelete
              text="delete"
              resourceName="community"
              onConfirm={() => deleteCommunity(community?.ID)}
              disabled={
                isLoading || isLoadingCurrentUser || isDeletingCommunity
              }
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default CommunityDescription;
