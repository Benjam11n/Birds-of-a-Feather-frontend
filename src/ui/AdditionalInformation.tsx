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

  return (
    <Card className="w-[300px]">
      <CardHeader>
        {popularCommunities && (
          <Label className="text-lg">Popular Communities</Label>
        )}
        {user && <Label className="text-lg">{user.name}</Label>}
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
