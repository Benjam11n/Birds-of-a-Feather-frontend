import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateReplyForm from "./CreateReplyForm";
import { useCreateReply } from "./useCreateReply";

export default function CreateReplyModal({ postId }: { postId: number }) {
  const { status } = useCreateReply(postId);
  const isEditing: boolean = status === "pending";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isEditing}>Reply</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create reply</DialogTitle>
          <DialogDescription>
            Create your reply here. Click reply when you're done.
          </DialogDescription>
        </DialogHeader>

        <CreateReplyForm postId={postId} />
      </DialogContent>
    </Dialog>
  );
}
