import Spinner from "../../ui/Spinner";
import UserRow from "./UserRow";
import { useGetUser } from "./useUsers";
import { users } from "../../types/allTypes";
import { useCurrentUser } from "./useCurrentUser";
import { useFollowing } from "../following/useFollowing";

function UserTable() {
  const { currentUser } = useCurrentUser();
  const { users, isLoading } = useGetUser();
  const { followings } = useFollowing();
  if (isLoading) return <Spinner />;

  const otherUsers = users?.filter((user: users) => user.ID !== currentUser.ID);

  const nonFollowedUsers = otherUsers?.filter((user: users) => {
    const followedUserId = followings?.map((following) => following.ID);
    return !followedUserId?.includes(user.ID);
  });

  return (
    <div className="space-y-3">
      {nonFollowedUsers &&
        nonFollowedUsers.map((user: users) => {
          return <UserRow user={user} key={user.ID} />;
        })}
    </div>
  );
}

export default UserTable;
