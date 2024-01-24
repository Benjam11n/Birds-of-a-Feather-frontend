import { post } from "@/types/allTypes";
import { usePosts } from "../Posts/usePosts";
import { useCurrentUser } from "./useCurrentUser";
import Stats from "@/ui/Stats";
import Charts from "@/ui/Charts";
import Filter from "@/ui/Filter";

function AccountStatistics() {
  const { posts } = usePosts();
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser;
  const creatorPosts =
    posts?.filter((post: post) => post.userId === userId) || [];

  const numCreatorPosts: number = creatorPosts?.length;
  const numUpvotes: number = creatorPosts
    ? creatorPosts.reduce((acc: number, post: post) => post.votes + acc, 0)
    : 0;

  const numViews: number = creatorPosts
    ? creatorPosts.reduce((acc: number, post: post) => post.views + acc, 0)
    : 0;

  const numDays: string = Math.floor(
    (new Date().getTime() - new Date(currentUser?.CreatedAt).getTime()) /
      (24 * 60 * 60 * 1000)
  ).toString(); // 24 hours, 60 minutes, 60 seconds, 1000 milliseconds

  const options = [
    { value: "7", label: "Last Week" },
    { value: "30", label: "Last Month" },
    { value: "90", label: "Last 3 Months" },
  ];

  return (
    <div className="grid grid-cols-3 grid-rows-[auto_auto_1fr] space-y-6">
      <div className="col-span-3 my-4 flex justify-end gap-2">
        <Filter filterField="days" options={options} />
      </div>
      <Stats
        numCreatorPosts={numCreatorPosts}
        numUpvotes={numUpvotes}
        numViews={numViews}
        numDays={numDays}
      />
      <Charts creatorPosts={creatorPosts} />
    </div>
  );
}

export default AccountStatistics;
