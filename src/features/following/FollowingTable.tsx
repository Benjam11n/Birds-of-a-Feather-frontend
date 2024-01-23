import Spinner from "../../ui/Spinner";
import { useFollowing } from "./useFollowing";
import FollowingRow from "./FollowingRow";

function FollowingTable() {
  const { followings, isLoading } = useFollowing();
  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-3">
      {followings &&
        followings.map((following) => (
          <FollowingRow following={following} key={following.ID} />
        ))}
    </div>
  );
}

export default FollowingTable;
