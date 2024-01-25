import Spinner from "../../ui/Spinner";
import UserRow from "./UserRow";
import { useGetUser } from "./useUsers";
import { users } from "../../types/allTypes";
import { useCurrentUser } from "./useCurrentUser";
import { useFollowing } from "../following/useFollowing";

function UserTable() {
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { users: allUsers, isLoading: isLoadingAllUsers } = useGetUser();
  const { followings, isLoading: isLoadingFollowings } = useFollowing();

  const isLoading =
    isLoadingAllUsers || isLoadingCurrentUser || isLoadingFollowings;

  if (isLoading) return <Spinner />;

  const otherUsers = allUsers?.filter((user) => user.ID !== currentUser!.ID);

  const nonFollowedUsers = otherUsers?.filter((user) => {
    const followedUserIds = followings?.map((following) => following.ID);
    return !followedUserIds?.includes(user.ID);
  });

  return (
    <div className="space-y-3">
      {nonFollowedUsers &&
        nonFollowedUsers.map((user: users) => (
          <UserRow user={user} key={user.ID} />
        ))}
    </div>
  );
}

export default UserTable;
