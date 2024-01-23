import FollowingTable from "../features/following/FollowingTable";
import UserTable from "../features/users/UserTable";

function Friends() {
  return (
    <div className="grid grid-cols-2 space-x-3 space-y-4">
      <h1 className="ml-3 mt-4 text-3xl font-bold">Following</h1>
      <h1 className="ml-3 text-3xl font-bold">Add Friends</h1>
      <FollowingTable />
      <UserTable />
    </div>
  );
}

export default Friends;
