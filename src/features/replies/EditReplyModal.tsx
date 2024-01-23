import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { reply } from "@/types/allTypes";
import { useEditReply } from "./useEditReply";
import EditReplyForm from "./EditReplyForm";

export default function EditReplyModal({
  replyToEdit,
}: {
  replyToEdit: reply;
}) {
  const { status } = useEditReply(replyToEdit.parentId);
  const isEditing: boolean = status === "pending";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isEditing}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit reply</DialogTitle>
          <DialogDescription>
            Make changes to your reply here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <EditReplyForm replyToEdit={replyToEdit} />
      </DialogContent>
    </Dialog>
  );
}
