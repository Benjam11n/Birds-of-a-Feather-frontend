import { Users } from "@/types/allTypes";
import AvatarIcon from "@/ui/AvatarIcon";

function UserIntroduction({ user }: { user: Users }) {
  return (
    <div className="flex flex-col justify-start space-y-4">
      <AvatarIcon user={user} />
      <p className="text-sm text-muted-foreground">{user.userBio}</p>
    </div>
  );
}

export default UserIntroduction;
