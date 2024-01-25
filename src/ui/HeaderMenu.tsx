import { useCurrentUser } from "@/features/users/useCurrentUser";
import AvatarIcon from "./AvatarIcon";
import UserMenu from "./UserMenu";

function HeaderMenu() {
  const { currentUser } = useCurrentUser();

  return (
    <div className="flex flex-row justify-end">
      <AvatarIcon user={currentUser!} />
      <UserMenu />
    </div>
  );
}

export default HeaderMenu;
