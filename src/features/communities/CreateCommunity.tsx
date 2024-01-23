import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import CreateCommunityForm from "./CreateCommunityForm";

function CreateCommunity() {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <span className="font-semibold">Can't find what you like?</span>
        <span className="text-muted-foreground text-sm">
          Create your own community!
        </span>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <CreateCommunityForm />
      </CardFooter>
    </Card>
  );
}

export default CreateCommunity;
