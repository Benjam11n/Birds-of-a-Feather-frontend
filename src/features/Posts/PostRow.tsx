import { post, users } from "../../types/allTypes";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import ReplyTable from "../replies/ReplyTable";
import { useCurrentUser } from "../users/useCurrentUser";
import { useReplies } from "../replies/useReplies";
import { useGetUser } from "../users/useUsers";
import PostDetails from "./PostDetails";
import PostOperations from "./PostOperations";

function PostRow({ post }: { post: post }) {
  const { currentUser } = useCurrentUser();
  const { users } = useGetUser();
  const { replies } = useReplies(post.ID);
  const { userId } = post;

  const postCreator: users = users?.find((user: users) => user.ID === userId);

  return (
    <main>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <PostDetails postCreator={postCreator} post={post} />
          </AccordionTrigger>

          <PostOperations post={post} currentUser={currentUser} />
          {replies?.length > 0 && (
            <AccordionContent>
              <ReplyTable post={post} />
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </main>
  );
}

export default PostRow;
