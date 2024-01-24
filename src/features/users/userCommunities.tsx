import Spinner from "@/ui/Spinner";
import { useUserCommunities } from "./useUserCommunities";
import { community } from "@/types/allTypes";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function UserCommunities() {
  const { communities, isLoading } = useUserCommunities();
  const navigate = useNavigate();
  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="font-semibold mt-4">Communities:</div>
      <div>
        {communities &&
          communities.map((community: community) => (
            <Button
              key={community.ID}
              variant="ghost"
              className="flex w-full justify-start"
              onClick={() => navigate(`/communities/${community.ID}`)}
            >
              {community.title}
            </Button>
          ))}
      </div>
    </div>
  );
}

export default UserCommunities;
