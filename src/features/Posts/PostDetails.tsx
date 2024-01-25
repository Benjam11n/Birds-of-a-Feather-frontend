import { post, postVote, users } from "@/types/allTypes";
import PostUser from "./PostUser";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/utils/timeAgo";
import { usePostVotes } from "./usePostVotes";
import Spinner from "@/ui/Spinner";
import { useCommunityById } from "../communities/useCommunityById";

function PostDetails({
  postCreator,
  post,
}: {
  postCreator: users;
  post: post;
}) {
  const { title, CreatedAt, edited, tags, communityId, ID } = post;
  const { community, isLoading: isLoadingCommunity } =
    useCommunityById(communityId);
  const { postVotes, isLoading: isLoadingPostVotes } = usePostVotes(ID);
  if (!post) return;

  if (isLoadingPostVotes || isLoadingCommunity) return <Spinner />;

  const votes: number =
    postVotes?.reduce(
      (acc: number, postVote: postVote) => postVote.voteValue + acc,
      0
    ) || 0;
  const date = new Date(CreatedAt);
  const formattedDate = timeAgo(date);

  const className: string =
    "flex items-center justify-start space-x-2 text-muted-foreground";
  return (
    <div className="grid w-full grid-cols-[auto_auto_auto_auto_auto_1fr] grid-rows-[auto_auto_auto_auto_1fr] gap-2 px-6">
      <PostUser postCreator={postCreator} />
      {community?.title && (
        <div className="flex items-center justify-start space-x-2 gap-x-1">
          post from <span className="font-semibold">{community?.title}</span>
        </div>
      )}

      <div className={className}>Likes: {votes}</div>

      <div className={className}>Created: {formattedDate}</div>

      <div className={className}>{edited ? "edited" : ""}</div>

      <div className="col-span-6 flex justify-start text-2xl font-bold">
        {title}
      </div>

      {tags && <Badge className="justify-left mb-4 flex w-fit">{tags}</Badge>}
    </div>
  );
}

export default PostDetails;
