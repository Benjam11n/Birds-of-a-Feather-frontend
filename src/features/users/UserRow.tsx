import { Button } from "@/components/ui/button";
import { useCreateFollow } from "../following/useCreateFollow";
import { users } from "../../types/allTypes";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import UserIntroduction from "./UserIntroduction";

function UserRow({ user }: { user: users }) {
  const { createFollow, status } = useCreateFollow();
  const isCreatingFollow = status === "pending";
  if (!user) return;
  const { ID: userId } = user;

  return (
    <Card className="hover:bg-accent">
      <CardHeader>
        <div className="flex h-auto items-baseline justify-between space-y-3">
          <UserIntroduction user={user} />
          <CardFooter>
            <Button
              onClick={() => createFollow(userId)}
              disabled={isCreatingFollow}
            >
              Follow
            </Button>
          </CardFooter>
        </div>
      </CardHeader>
    </Card>
  );
}

export default UserRow;
