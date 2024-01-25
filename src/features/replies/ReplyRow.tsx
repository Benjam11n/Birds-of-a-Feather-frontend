import { useDeleteReply } from "./useDeleteReply";
import { useEditReply } from "./useEditReply";
import { Button } from "@/components/ui/button";
// import EditReplyForm from "../replies/EditReplyForm";
import { useVoteReply } from "./useVoteReply";
import { reply, replyVote, users } from "../../types/allTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ConfirmDelete from "@/ui/ConfirmDelete";
import EditReplyModal from "./EditReplyModal";
import { useCurrentUser } from "../users/useCurrentUser";
import { useReplyVotes } from "./useReplyVotes";
import Spinner from "@/ui/Spinner";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { useDeleteReplyVote } from "./useDeleteReplyVote";
import { useUpdateReplyVote } from "./useUpdateReplyVote";
import { useGetUser } from "../users/useUsers";
import AvatarIcon from "@/ui/AvatarIcon";
import { usePost } from "../Posts/usePost";
import { BACKEND_URL } from "@/utils/constants";
import { NavLink } from "react-router-dom";

function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

function ReplyRow({ reply }: { reply: reply }) {
  const { currentUser } = useCurrentUser();
  const { users, isLoading: isLoadingUser } = useGetUser();
  const { deleteReply, status } = useDeleteReply(reply.parentId);
  const { status: editingStatus } = useEditReply(reply.parentId);
  const { voteReply, status: likingStatus } = useVoteReply(reply.ID);
  const { replyVotes, isLoading: isLoadingReplyVotes } = useReplyVotes(
    reply.ID
  );
  const { ID: replyId, content, parentId, CreatedAt, edited, userId } = reply;
  const { post, isLoading: isLoadingPost } = usePost(parentId);
  const { updateReplyVote, status: updateReplyStatus } =
    useUpdateReplyVote(replyId);
  const { deleteReplyVote, status: deleteReplyStatus } =
    useDeleteReplyVote(replyId);
  const replyCreator = users?.find((user: users) => (user.ID = reply.userId));
  const isLiking: boolean = likingStatus === "pending";
  const isEditing: boolean = editingStatus === "pending";
  const isDeleting: boolean = status === "pending";
  const isUpdatingReplyVote: boolean = updateReplyStatus === "pending";
  const isDeletingReplyVote: boolean = deleteReplyStatus === "pending";

  if (isEditing || isDeleting || isLoadingUser || isLoadingPost)
    return <Spinner />;

  const date = new Date(CreatedAt);
  const formattedDate = timeAgo(date);

  const userVote: replyVote[] =
    replyVotes?.filter(
      (replyVote: replyVote) =>
        replyVote.userId === currentUser!.ID && replyVote.replyId === replyId
    ) || [];
  const totalVotes: number = Array.isArray(replyVotes)
    ? replyVotes.reduce(
        (acc: number, replyVote: replyVote) => replyVote.voteValue + acc,
        0
      )
    : 0;

  const alreadyUpVoted: boolean =
    ((userVote?.length ?? 0) >= 1 &&
      userVote?.map((vote: replyVote) => vote.voteValue).includes(1)) ||
    false;

  const alreadyDownVoted: boolean =
    ((userVote?.length ?? 0) >= 1 &&
      userVote?.map((vote: replyVote) => vote.voteValue).includes(-1)) ||
    false;

  function voteOrDelete(
    replyId: number,
    alreadyUpVoted: boolean,
    alreadyDownVoted: boolean,
    newReplyVote: replyVote
  ): void {
    if (
      (alreadyUpVoted && newReplyVote.voteValue === 1) ||
      (alreadyDownVoted && newReplyVote.voteValue === -1)
    ) {
      deleteReplyVote(replyId);
    } else if (alreadyUpVoted || alreadyDownVoted) {
      updateReplyVote(newReplyVote);
    } else {
      voteReply(newReplyVote);
    }
  }

  return (
    <main className="ml-10">
      <Card>
        <CardHeader className="grid grid-cols-[auto_auto_auto_1fr] gap-4 pb-3">
          <CardTitle>
            <AvatarIcon user={replyCreator!} />
          </CardTitle>
          <CardDescription>
            <div>
              <NavLink
                to={"/posts/" + reply.parentId}
                className="hover:underline"
              >
                reply to <span className="font-semibold">{post?.title}</span>
              </NavLink>
            </div>
            <div>Likes: {totalVotes}</div>
            <div>Created: {formattedDate}</div>
            <div>{edited ? "edited" : ""}</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reply.imagesUrl && (
            <img
              className="rounded-md max-h-[300px] object-contain relative"
              src={BACKEND_URL + reply.imagesUrl}
              alt="reply image"
            ></img>
          )}
          <div className="pt-8">{content}</div>
        </CardContent>
        <CardFooter className="flex flex-row justify-end">
          <div className="flex flex-row gap-1">
            {currentUser!.ID === userId && (
              <ConfirmDelete
                text="Delete"
                resourceName="reply"
                onConfirm={() => deleteReply({ replyId: replyId, parentId })}
                disabled={
                  isDeleting ||
                  isEditing ||
                  isLiking ||
                  isLoadingReplyVotes ||
                  isUpdatingReplyVote ||
                  isDeletingReplyVote
                }
              ></ConfirmDelete>
            )}

            {currentUser!.ID === userId && (
              <EditReplyModal replyToEdit={reply} />
            )}

            <Button
              onClick={() => {
                const newReplyVote: replyVote = {
                  userId: currentUser!.ID,
                  replyId: replyId,
                  voteValue: 1,
                  CreatedAt: new Date().toISOString(),
                };
                voteOrDelete(
                  replyId,
                  alreadyUpVoted,
                  alreadyDownVoted,
                  newReplyVote
                );
              }}
              active={alreadyUpVoted}
              disabled={
                isDeleting ||
                isLiking ||
                isEditing ||
                isLoadingReplyVotes ||
                isUpdatingReplyVote ||
                isDeletingReplyVote
              }
              className="rounded-3xl"
            >
              <FiArrowUp />
            </Button>

            <Button
              onClick={() => {
                const newReplyVote: replyVote = {
                  userId: currentUser!.ID,
                  replyId: replyId,
                  voteValue: -1,
                  CreatedAt: new Date().toISOString(),
                };
                voteOrDelete(
                  replyId,
                  alreadyUpVoted,
                  alreadyDownVoted,
                  newReplyVote
                );
              }}
              active={alreadyDownVoted}
              disabled={
                isDeleting ||
                isLiking ||
                isEditing ||
                isLoadingReplyVotes ||
                isUpdatingReplyVote ||
                isDeletingReplyVote
              }
              className="rounded-3xl"
            >
              <FiArrowDown />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default ReplyRow;
