import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { community, users } from "@/types/allTypes";
import { NavLink, useNavigate } from "react-router-dom";
import UserCommunities from "@/features/users/userCommunities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BACKEND_URL } from "@/utils/constants";

function AdditionalInformation({
  popularCommunities,
  deletedCommunity,
  user,
}: {
  popularCommunities?: community[] | undefined;
  deletedCommunity?: boolean;
  user?: users | undefined;
}) {
  const navigate = useNavigate();

  return (
    <Card className="w-[300px]">
      <CardHeader>
        {popularCommunities && (
          <Label className="text-lg">Popular Communities</Label>
        )}
        {user && <Label className="text-lg">{user.name}</Label>}
        {deletedCommunity && (
          <Label className="text-lg">The community has been deleted.</Label>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {popularCommunities &&
          popularCommunities?.map((community: community) => (
            <NavLink
              to={`/communities/${community.ID}`}
              className="flex w-full justify-start gap-3 hover:bg-accent rounded-md"
              key={community.ID}
            >
              <Avatar>
                <AvatarImage
                  src={
                    community.iconUrl
                      ? BACKEND_URL + community.iconUrl
                      : "/default_community_logo.jpg"
                  }
                  alt="community icon"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="mt-1">{community.title}</div>
            </NavLink>
          ))}
        {user &&
          (user.userBio ? (
            <div>{user.userBio}</div>
          ) : (
            <div>
              {" "}
              We're glad you're here! While there's no bio available at the
              moment, feel free to share more about yourself to personalize your
              profile.
            </div>
          ))}
        {user && <UserCommunities />}
        {deletedCommunity && (
          <div>
            Feel free to go to the communities page to create your own
            community!
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {user && (
          <Button onClick={() => navigate("/editAccount")}>
            Update your account
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default AdditionalInformation;
