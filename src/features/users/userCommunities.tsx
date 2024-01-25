import Spinner from "@/ui/Spinner";
import { useUserCommunities } from "./useUserCommunities";
import { community } from "@/types/allTypes";
import { NavLink } from "react-router-dom";
import { BACKEND_URL } from "@/utils/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserCommunities() {
  const { communities, isLoading } = useUserCommunities();
  if (isLoading) return <Spinner />;

  return (
    <div>
      {communities && <div className="font-semibold mt-4">Communities:</div>}
      <div className="space-y-3 mt-3">
        {communities &&
          communities?.map((community: community) => (
            <NavLink
              to={`/communities/${community.ID}`}
              className="flex w-full justify-start gap-3 hover:bg-accent rounded-md"
              key={community.ID}
            >
              <Avatar>
                <AvatarImage
                  src={BACKEND_URL + community.iconUrl}
                  alt="community icon"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="mt-1">{community.title}</div>
            </NavLink>
          ))}
      </div>
    </div>
  );
}

export default UserCommunities;
