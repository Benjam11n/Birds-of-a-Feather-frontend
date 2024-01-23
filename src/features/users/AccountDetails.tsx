import { useCurrentUser } from "./useCurrentUser";
import { usePosts } from "../Posts/usePosts";
import { post, reply } from "@/types/allTypes";
import PostRow from "../Posts/PostRow";
import Spinner from "@/ui/Spinner";
import { useSearchParams } from "react-router-dom";
import useAllReplies from "../replies/useAllReplies";
import ReplyRow from "../replies/ReplyRow";
import { Button } from "@/components/ui/button";

function AccountDetails() {
  const { currentUser } = useCurrentUser();
  const { posts, isLoading: isLoadingPosts } = usePosts();
  const { replies, isLoading: isLoadingReplies } = useAllReplies();
  const creatorPosts: post[] =
    posts?.filter((post: post) => post.userId === currentUser.userId) || [];

  const creatorReplies: reply[] = replies?.filter(
    (reply: reply) => reply.userId === currentUser.userId
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("details") || "posts";

  if (isLoadingReplies || isLoadingPosts) return <Spinner />;
  return (
    <div className="space-x-1 space-y-4">
      <Button
        onClick={() => {
          searchParams.set("details", "posts");
          setSearchParams(searchParams);
        }}
        disabled={currentFilter === "posts"}
      >
        Posts
      </Button>
      <Button
        onClick={() => {
          searchParams.set("details", "replies");
          setSearchParams(searchParams);
        }}
        disabled={currentFilter === "replies"}
      >
        Replies
      </Button>
      {currentFilter === "posts"
        ? creatorPosts &&
          creatorPosts.map((post: post) => <PostRow post={post} />)
        : creatorReplies &&
          creatorReplies.map((reply: reply) => <ReplyRow reply={reply} />)}
    </div>
  );
}

export default AccountDetails;
