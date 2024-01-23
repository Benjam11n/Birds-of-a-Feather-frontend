import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { community } from "@/types/allTypes";
import { NavLink } from "react-router-dom";
import { useCommunityMembers } from "./useCommunityMembers";
import Spinner from "@/ui/Spinner";

function CommunityRow({
  community,
  ranking,
}: {
  community: community;
  ranking: number;
}) {
  const { title, ID, description } = community;
  const { communityMembers, isLoading } = useCommunityMembers(ID || 0);
  if (isLoading) return <Spinner />;
  return (
    <Card className="hover:bg-accent">
      <CardHeader>
        <NavLink
          to={`${ID}`}
          className="grid grid-cols-[auto_auto_1fr] grid-rows-[auto_1fr] items-center justify-center"
        >
          <CardTitle className="row-span-2 ml-4 mr-8 flex items-center">
            {ranking}
          </CardTitle>
          <Avatar className="row-span-2 flex h-16 w-16">
            <AvatarImage
              src={"http://localhost:8080" + community.iconUrl}
              alt="name"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle className="ml-4 mt-2">{title}</CardTitle>
          <CardDescription className="ml-4 mt-2 grid grid-rows-2">
            {description}
            <span>{communityMembers?.length || 0} members</span>
          </CardDescription>
        </NavLink>
      </CardHeader>
    </Card>
  );
}

export default CommunityRow;
