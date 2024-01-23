import PostTableOperations from "@/features/Posts/PostTableOperations";
import FypTable from "../features/fyp/FypTable";

function FYP() {
  return (
    <div className="mx-4 my-4 space-y-4">
      <PostTableOperations />
      <FypTable />
    </div>
  );
}

export default FYP;
