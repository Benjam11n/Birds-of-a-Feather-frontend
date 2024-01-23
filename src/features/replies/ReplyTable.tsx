import Spinner from "../../ui/Spinner";
import ReplyRow from "./ReplyRow";
import { useReplies } from "./useReplies";
import { post, reply } from "../../types/allTypes";

function ReplyTable({ post }: { post: post }) {
  const { isLoading, replies } = useReplies(post.ID);

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-2">
      {replies &&
        replies.map((reply: reply) => {
          return <ReplyRow reply={reply} key={reply.ID} />;
        })}
    </div>
  );
}

export default ReplyTable;
