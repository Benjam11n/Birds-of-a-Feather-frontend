import { Button } from "@/components/ui/button";
import ConfirmDelete from "@/ui/ConfirmDelete";
import CreateReplyModal from "../replies/CreateReplyModal";
import EditPostFormv2 from "./EditPostModal";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { post, postVote, users } from "@/types/allTypes";
import { usePostVotes } from "./usePostVotes";
import { useDeletePostVote } from "./useDeletePostVote";
import { useVotePost } from "./useVotePost";
import { useUpdatePostVote } from "./useUpdatePostVote";
import { useDeletePost } from "./useDeletePost";

function PostOperations({
  currentUser,
  post,
}: {
  currentUser: users;
  post: post;
}) {
  const { ID: currentUserId } = currentUser;
  const { ID: postId, userId } = post;
  const { postVotes, isLoading: isLoadingPostVotes } = usePostVotes(postId);
  const { votePost, status: voteStatus } = useVotePost(postId);
  const isVoting = voteStatus === "pending";
  const { updatePostVote, status: updateStatus } = useUpdatePostVote(postId);
  const isUpdatingPostVote = updateStatus === "pending";
  const { deletePostVote, status } = useDeletePostVote(postId);
  const isDeletingPostVote = status === "pending";
  const { deletePost, status: deletePostStatus } = useDeletePost();
  const deletingPost: boolean = deletePostStatus === "pending";
  const disabled =
    isVoting ||
    isUpdatingPostVote ||
    isDeletingPostVote ||
    deletingPost ||
    isLoadingPostVotes;

  const userVote = (postVotes ?? []).filter(
    (postVote: postVote) =>
      postVote.userId === currentUserId && postVote.postId === postId
  );
  const alreadyUpVoted: boolean =
    ((userVote?.length ?? 0) >= 1 &&
      userVote?.map((vote: postVote) => vote.voteValue).includes(1)) ||
    false;

  const alreadyDownVoted: boolean =
    ((userVote?.length ?? 0) >= 1 &&
      userVote?.map((vote: postVote) => vote.voteValue).includes(-1)) ||
    false;

  function voteOrDelete(
    postId: number,
    alreadyUpVoted: boolean,
    alreadyDownVoted: boolean,
    postVote: postVote
  ): void {
    if (
      (alreadyUpVoted && postVote.voteValue === 1) ||
      (alreadyDownVoted && postVote.voteValue === -1)
    ) {
      deletePostVote(postId);
    } else if (alreadyUpVoted || alreadyDownVoted) {
      updatePostVote({ id: postId, postVote });
    } else {
      votePost(postVote);
    }
  }
  return (
    <div className="col-start-4 mx-4 my-3 flex flex-row justify-end gap-1">
      {currentUserId === userId && (
        <ConfirmDelete
          text="Delete"
          resourceName="post"
          onConfirm={() => deletePost(postId)}
          disabled={disabled}
        ></ConfirmDelete>
      )}

      {currentUserId === userId && <EditPostFormv2 postToEdit={post} />}

      <CreateReplyModal postId={postId} />

      <Button
        onClick={() => {
          const postVote: postVote = {
            postId: postId,
            userId: currentUserId,
            voteValue: 1,
            CreatedAt: new Date().toISOString(),
          };
          voteOrDelete(postId, alreadyUpVoted, alreadyDownVoted, postVote);
        }}
        disabled={disabled}
        className="rounded-3xl"
        active={alreadyUpVoted}
      >
        <FiArrowUp />
      </Button>

      <Button
        onClick={() => {
          const postVote: postVote = {
            postId: postId,
            userId: currentUserId,
            voteValue: -1,
            CreatedAt: new Date().toISOString(),
          };
          voteOrDelete(postId, alreadyUpVoted, alreadyDownVoted, postVote);
        }}
        disabled={disabled}
        className="rounded-3xl"
        active={alreadyDownVoted}
      >
        <FiArrowDown />
      </Button>
    </div>
  );
}

export default PostOperations;
