import PostTableOperations from "@/features/Posts/PostTableOperations";
import PostTable from "../features/Posts/PostTable";

function DashBoard() {
  return (
    <div className="mx-4 my-4 space-y-3">
      <PostTableOperations />
      <PostTable />
    </div>
  );
}

export default DashBoard;
