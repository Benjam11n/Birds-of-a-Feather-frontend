import { post } from "@/types/allTypes";
import { usePosts } from "../Posts/usePosts";
import { useCurrentUser } from "./useCurrentUser";
import Stats from "@/ui/Stats";
import Charts from "@/ui/Charts";
import Filter from "@/ui/Filter";
import Spinner from "@/ui/Spinner";

function AccountStatistics() {
  const { posts, isLoading: isLoadingPosts } = usePosts();
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { ID } = currentUser!;

  // return spinner if loading
  const isLoading: boolean = isLoadingCurrentUser || isLoadingPosts;
  if (isLoading) return <Spinner />;

  const creatorPosts = posts?.filter((post: post) => post.userId === ID) || [];

  // calculate the number of posts
  const numCreatorPosts: number = creatorPosts?.length || 0;

  // calculate the number of upvotes
  const numUpvotes: number = creatorPosts
    ? creatorPosts.reduce((acc: number, post: post) => post.votes + acc, 0)
    : 0;

  // calculate the number of views
  const numViews: number = creatorPosts
    ? creatorPosts.reduce((acc: number, post: post) => post.views + acc, 0)
    : 0;

  // calculate and format the number of days since the creation of the account
  const numDays: string = Math.floor(
    (new Date().getTime() - new Date(currentUser!.CreatedAt).getTime()) /
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
