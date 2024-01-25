import { post, users } from "../../types/allTypes";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useCurrentUser } from "../users/useCurrentUser";
import { useGetUser } from "../users/useUsers";
import PostDetails from "./PostDetails";
import PostOperations from "./PostOperations";
import { BACKEND_URL } from "@/utils/constants";
import { useParams } from "react-router-dom";

function PostRow({ post }: { post: post }) {
  const { currentUser } = useCurrentUser();
  const { postId } = useParams();
  const { users } = useGetUser();
  const { userId } = post;
  const { content, imagesUrl } = post;
  const postCreator: users = users?.find((user: users) => user.ID === userId);

  return (
    <main>
      <Card className="hover:bg-accent">
        <CardHeader>
          <CardTitle>
            <PostDetails postCreator={postCreator} post={post} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="ml-8">{content}</div>
          {post.imagesUrl && (
            <img
              className="col-span-5 rounded-md max-h-[500px] object-contain relative"
              src={BACKEND_URL + imagesUrl}
              alt="post image"
            ></img>
          )}
        </CardContent>

        {postId && (
          <div>
            <PostOperations post={post} currentUser={currentUser} />
          </div>
        )}
      </Card>
    </main>
  );
}

export default PostRow;
