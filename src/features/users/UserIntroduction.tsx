import { users } from "@/types/allTypes";
import AvatarIcon from "@/ui/AvatarIcon";

function UserIntroduction({ user }: { user: users }) {
  return (
    <div className="flex flex-col justify-start space-y-4">
      <AvatarIcon user={user} />
      <p className="text-sm text-muted-foreground">{user.userBio}</p>
    </div>
  );
}

export default UserIntroduction;
