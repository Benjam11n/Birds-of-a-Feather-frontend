import { useParams } from "react-router-dom";
import { usePost } from "./usePost";
import PostRow from "./PostRow";
import Spinner from "@/ui/Spinner";
import { useReplies } from "../replies/useReplies";
import { reply, replyVote } from "@/types/allTypes";
import ReplyRow from "../replies/ReplyRow";
import PostNotFound from "./PostNotFound";
import CommunityDescription from "../communities/CommunityDescription";
import { useCommunityById } from "../communities/useCommunityById";
import { useAllReplyVotes } from "../replies/useAllReplyVotes";
import AdditionalInformation from "@/ui/AdditionalInformation";

function PostHomepage() {
  const { postId } = useParams();
  const { post, isLoading: isLoadingPost } = usePost(Number(postId));
  const {
    community,
    isLoading: isLoadingCommunity,
    error,
  } = useCommunityById(Number(post?.communityId));
  const { replyVotes } = useAllReplyVotes();
  const { replies, isLoading: isLoadingReplies } = useReplies(Number(postId));
  // sort replies by highest likes
  const sortedReplies = replies?.sort((a: reply, b: reply) => {
    const aVotesValue: number = (
      replyVotes?.filter(
        (replyVote: replyVote) => replyVote.replyId === a.ID
      ) || []
    ).reduce((acc, replyVote) => acc + replyVote.voteValue, 0);
    const bVotesValue: number = (
      replyVotes?.filter(
        (replyVote: replyVote) => replyVote.replyId === b.ID
      ) || []
    ).reduce((acc, replyVote) => acc + replyVote.voteValue, 0);
    return bVotesValue - aVotesValue;
  });

  if ((isLoadingPost || isLoadingReplies || isLoadingCommunity) && !error) {
    return <Spinner />;
  }

  if (!post) {
    return <PostNotFound />;
  }

  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr_auto]">
      <PostRow post={post} />
      <div className="ml-6 mr-24 mt-3">
        {community ? (
          <CommunityDescription community={community} />
        ) : (
          <AdditionalInformation deletedCommunity={true} />
        )}
      </div>
      <div className="mx-4 my-4 space-y-3">
        {(sortedReplies?.length || 0) > 0 &&
          replies?.map((reply: reply) => (
            <ReplyRow reply={reply} key={reply.ID} />
          ))}
      </div>
    </div>
  );
}

export default PostHomepage;
