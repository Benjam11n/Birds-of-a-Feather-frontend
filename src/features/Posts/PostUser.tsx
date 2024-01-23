import { users } from "@/types/allTypes";
import AvatarIcon from "@/ui/AvatarIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiCalendarDate } from "react-icons/ci";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { format } from "date-fns";

function PostUser({ postCreator }: { postCreator: users }) {
  const { userBio } = postCreator || "";
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <AvatarIcon user={postCreator} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage
              src={"http://localhost:8080" + postCreator?.avatarUrl}
            />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{postCreator?.name}</h4>
            {userBio && <p className="text-sm">{userBio}</p>}
            <div className="flex items-center pt-2">
              <CiCalendarDate className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {postCreator && format(postCreator?.CreatedAt, "MMMM dd yyyy")}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default PostUser;
