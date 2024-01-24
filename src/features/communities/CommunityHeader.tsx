import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useJoinCommunity } from "./useJoinCommunity";
import Spinner from "@/ui/Spinner";
import { useCommunityMembers } from "./useCommunityMembers";
import { useCurrentUser } from "../users/useCurrentUser";
import { useUnfollowCommunity } from "./useUnfollowCommunity";
import { Badge } from "@/components/ui/badge";
import CreatePostForm from "../Posts/CreatePostForm";
import { community, communityMember } from "@/types/allTypes";
import { BACKEND_URL } from "@/utils/constants";

function CommunityHeader({ community }: { community: community }) {
  // Destructuring community object
  const { ID: communityId, category, iconUrl, title } = community;

  // Custom hooks
  const { currentUser } = useCurrentUser();
  const { joinCommunity, status: joinStatus } = useJoinCommunity(
    communityId,
    currentUser.userId
  );
  const { communityMembers, isLoading: communityMembersLoading } =
    useCommunityMembers(communityId);
  const { unfollowCommunity, status: unfollowStatus } = useUnfollowCommunity(
    communityId,
    currentUser.userId
  );

  // States
  const isJoiningCommunity: boolean = joinStatus === "pending";
  const isUnfollowing: boolean = unfollowStatus === "pending";

  // Check if the user has already joined the community
  const alreadyJoined = communityMembers
    ?.map((member: communityMember) => member.userId)
    .includes(currentUser.ID);

  // Loading spinner
  if (communityMembersLoading) return <Spinner />;

  return (
    <Card className="col-span-2 grid w-full grid-cols-[auto_1fr_auto]">
      <CardContent>
        {/* Avatar Section */}
        <Avatar className="mt-6 h-24 w-24">
          <AvatarImage src={BACKEND_URL + iconUrl} alt="name" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardContent>

      {/* Community Information Section */}
      <div className="flex flex-col justify-center space-y-1.5 pr-6">
        <CardTitle>{title}</CardTitle>
        <div>{category && <Badge>{category}</Badge>}</div>
      </div>

      {/* Action Buttons Section */}
      <div className="flex items-center justify-end space-x-2 px-12">
        {alreadyJoined && <CreatePostForm communityId={communityId} />}
        {alreadyJoined ? (
          <Button
            variant="destructive"
            onClick={() => unfollowCommunity(communityId)}
            disabled={
              communityMembersLoading || isUnfollowing || isJoiningCommunity
            }
          >
            Unfollow
          </Button>
        ) : (
          <Button
            onClick={() => joinCommunity(communityId)}
            disabled={
              communityMembersLoading || isUnfollowing || isJoiningCommunity
            }
          >
            Join
          </Button>
        )}
      </div>
    </Card>
  );
}

export default CommunityHeader;
