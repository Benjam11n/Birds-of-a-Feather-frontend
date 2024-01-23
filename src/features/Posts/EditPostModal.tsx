import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { post } from "@/types/allTypes";
import { useEditPost } from "./useEditPost";
import EditPostForm from "./EditPostForm";

export default function EditPostFormv2({ postToEdit }: { postToEdit: post }) {
  const { status } = useEditPost();
  const isEditing: boolean = status === "pending";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isEditing}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>
            Make changes to your post here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <EditPostForm postToEdit={postToEdit} />
      </DialogContent>
    </Dialog>
  );
}
