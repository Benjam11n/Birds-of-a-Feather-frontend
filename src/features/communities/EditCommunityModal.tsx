import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditCommunityForm from "./EditCommunityForm";
import useUpdateCommunity from "./useUpdateCommunity";
import { community } from "@/types/allTypes";
import { Button } from "@/components/ui/button";

export default function EditCommunityModal({
  communityToEdit,
}: {
  communityToEdit: community;
}) {
  const { status } = useUpdateCommunity(communityToEdit.ID);
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

        <EditCommunityForm communityToEdit={communityToEdit} />
      </DialogContent>
    </Dialog>
  );
}
