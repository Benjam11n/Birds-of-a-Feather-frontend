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
import { useUpdateUser } from "@/features/users/useUpdateUser";
import { useCurrentUser } from "@/features/users/useCurrentUser";
import Spinner from "../../ui/Spinner";
import { Textarea } from "@/components/ui/textarea";
import { users } from "@/types/allTypes";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string(),
  userBio: z.string(),
});

function EditUsernameForm() {
  const { currentUser, isLoading } = useCurrentUser();
  const { updateUser, status } = useUpdateUser();
  const isUpdating: boolean = status === "pending";

  const { ID, userBio, name, avatarUrl, email, password, CreatedAt } =
    currentUser!;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: name,
      userBio: userBio,
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

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newUser: users = {
      ID,
      CreatedAt,
      name: values.username,
      email,
      password,
      avatarUrl,
      userBio: values.userBio,
    };
    updateUser({ userId: ID, newUser });
  };

  return (
    <div className="flex items-center flex-col border-b border-border py-6">
      <h1 className="font-semibold mb-6">Edit your Username and Bio</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-lg  flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="userBio"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>User bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="w-full" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Edit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default EditUsernameForm;
