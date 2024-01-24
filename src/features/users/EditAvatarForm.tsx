("use client");
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/users/useCurrentUser";
import Spinner from "../../ui/Spinner";
import { useEffect } from "react";
import { useUpdateUserAvatar } from "./useUpdateUserAvatar";
import { newUserAvatar } from "@/types/allTypes";

const formSchema = z.object({
  avatarUrl: z.string(),
});

function EditAvatarForm() {
  const { currentUser, isLoading } = useCurrentUser();
  const { updateUserAvatar, status } = useUpdateUserAvatar();
  const isUpdating: boolean = status === "pending";

  const { ID } = currentUser;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatarUrl: "",
    },
  });

  const { isSubmitSuccessful } = form.formState;

  useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    }

    form.reset();
  }, [isSubmitSuccessful, form]);

  if (isLoading) return <Spinner />;

  const handleSubmit = (
    values: z.infer<typeof formSchema>,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    if (typeof values.avatarUrl === "undefined") return;
    const newUser: newUserAvatar = {
      ID,
      avatarUrl: (e.target as HTMLFormElement).avatarUrl.files[0],
    };
    updateUserAvatar({ userId: ID, newUser });
  };

  return (
    <div className="flex items-center flex-col border-b border-border py-6 pb-24">
      <h1 className="font-semibold mb-6">Edit your Avatar</h1>
      <Form {...form}>
        <form
          onSubmit={(e) =>
            form.handleSubmit((values) => handleSubmit(values, e))
          }
          encType="multipart/form-data"
          className="flex w-full max-w-lg flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Upload your Avatar</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="w-full" disabled={isUpdating}>
            Edit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default EditAvatarForm;
