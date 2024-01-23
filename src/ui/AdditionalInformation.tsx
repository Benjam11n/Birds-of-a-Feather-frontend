import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { community, users } from "@/types/allTypes";
import { useNavigate } from "react-router-dom";
import { useFollowing } from "@/features/following/useFollowing";
import Spinner from "./Spinner";
import UserCommunities from "@/features/users/userCommunities";

function AdditionalInformation({
  popularCommunities,
  user,
}: {
  popularCommunities?: community[] | undefined;
  community?: community | undefined;
  user?: users | undefined;
}) {
  const navigate = useNavigate();
  const { followings, isLoading } = useFollowing();

  if (isLoading) return <Spinner />;
  // calculate the number of followers
  const followerNum: number =
    followings?.filter((following: users) => following.ID === user?.ID)
      .length || 0;

  return (
    <Card className="w-[300px]">
      <CardHeader>
        {popularCommunities && <Label>POPULAR COMMUNITIES</Label>}
        {user && <Label>{user.name}</Label>}
      </CardHeader>
      <CardContent>
        {popularCommunities &&
          popularCommunities?.map((community: community) => (
            <Button
              variant="ghost"
              className="flex w-full justify-start"
              onClick={() => navigate(`/communities/${community.ID}`)}
              key={community.ID}
            >
              {community.title}
            </Button>
          ))}
        {user && <div>{user.userBio}</div>}
        {user && <UserCommunities />}
      </CardContent>
      <CardFooter className="flex justify-between">
        {user && <div>Followers: {followerNum}</div>}
      </CardFooter>
    </Card>
  );
}

export default AdditionalInformation;
