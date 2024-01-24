import Stat from "./Stat";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { FiCalendar, FiThumbsUp } from "react-icons/fi";
import { LuMousePointerClick } from "react-icons/lu";

function Stats({
  numCreatorPosts,
  numViews,
  numUpvotes,
  numDays,
}: {
  numCreatorPosts: number;
  numViews: number;
  numUpvotes: number;
  numDays: string;
}) {
  return (
    <div className="col-span-3 grid grid-cols-4 space-x-4">
      <Stat
        title="Number of Posts"
        value={numCreatorPosts}
        icon={<MdOutlineLocalFireDepartment size={35} />}
      />
      <Stat
        title="Total Views"
        value={numViews}
        icon={<LuMousePointerClick size={35} />}
      />
      <Stat
        title="Total Upvotes"
        value={numUpvotes}
        icon={<FiThumbsUp size={35} />}
      />
      <Stat
        title="Creator for"
        value={numDays}
        icon={<FiCalendar size={35} />}
      />
    </div>
  );
}

export default Stats;
