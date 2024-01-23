import { Button } from "@/components/ui/button";
import { useDeleteFollow } from "./useDeleteFollow";
import { users } from "../../types/allTypes";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiCalendarDate } from "react-icons/ci";
import AvatarIcon from "@/ui/AvatarIcon";
import { useCreateFollow } from "./useCreateFollow";

function FollowingRow({ following }: { following: users }) {
  const { ID: userId } = following;
  const { deleteFollow, status: deletingStatus } = useDeleteFollow(userId);
  const { status: creatingStatus } = useCreateFollow();
  const isDeleting = deletingStatus === "pending";
  const isCreating = creatingStatus === "pending";

  return (
    <Card className="hover:bg-accent">
      <CardHeader>
        <div className="flex items-center justify-between">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div>
                <AvatarIcon user={following} />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@nextjs</h4>
                  {following?.userBio && (
                    <p className="text-sm">{following.userBio}</p>
                  )}
                  <div className="flex items-center pt-2">
                    <CiCalendarDate className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Joined December 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <CardFooter>
            <Button
              variant="destructive"
              onClick={() => deleteFollow(userId)}
              className="mt-6"
              disabled={isDeleting || isCreating}
            >
              Unfollow
            </Button>
          </CardFooter>
        </div>
      </CardHeader>
    </Card>
  );
}

export default FollowingRow;
