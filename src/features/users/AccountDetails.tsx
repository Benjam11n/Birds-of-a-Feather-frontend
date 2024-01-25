import { useCurrentUser } from "./useCurrentUser";
import { usePosts } from "../Posts/usePosts";
import { useAllReplies } from "../replies/useAllReplies";
import PostRow from "../Posts/PostRow";
import ReplyRow from "../replies/ReplyRow";
import Spinner from "@/ui/Spinner";
import { Button } from "@/components/ui/button";
import { NavLink, useSearchParams } from "react-router-dom";

function AccountDetails() {
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { posts, isLoading: isLoadingPosts } = usePosts();
  const { replies, isLoading: isLoadingReplies } = useAllReplies();
  const creatorPosts =
    posts?.filter((post) => post.userId === currentUser!.ID) || [];
  const creatorReplies = replies?.filter(
    (reply) => reply.userId === currentUser!.ID
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("details") || "posts";

  // return spinner if loading
  const isLoading: boolean =
    isLoadingReplies || isLoadingPosts || isLoadingCurrentUser;
  if (isLoading) return <Spinner />;

  const handleFilterClick = (filterType: "posts" | "replies") => {
    // set details in the url to filterType
    searchParams.set("details", filterType);
    setSearchParams(searchParams);
  };

  return (
    <div className="space-x-2 space-y-4">
      <Button
        onClick={() => handleFilterClick("posts")}
        disabled={currentFilter === "posts"}
      >
        Posts
      </Button>
      <Button
        onClick={() => handleFilterClick("replies")}
        disabled={currentFilter === "replies"}
      >
        Replies
      </Button>
      {currentFilter === "posts"
        ? creatorPosts.map((post) => (
            <div>
              <NavLink to={"/posts/" + post.ID}>
                <PostRow key={post.ID} post={post} />
              </NavLink>
            </div>
          ))
        : creatorReplies?.map((reply) => (
            <div>
              <NavLink to={"/posts/" + reply.parentId}>
                <ReplyRow key={reply.ID} reply={reply} />
              </NavLink>
            </div>
          ))}
    </div>
  );
}

export default AccountDetails;
