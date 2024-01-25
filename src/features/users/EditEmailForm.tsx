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
import { newUser } from "@/types/allTypes";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email(),
});

function EditEmailForm() {
  const { currentUser, isLoading } = useCurrentUser();
  const { updateUser, status } = useUpdateUser();
  const isUpdating: boolean = status === "pending";

  const { ID, email, name, avatarUrl, userBio } = currentUser!;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
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
    const newUser: newUser = {
      ID,
      name,
      email: values.email,
      avatarUrl,
      userBio,
    };
    updateUser({ userId: ID, newUser });
  };

  return (
    <div className="flex items-center flex-col border-b border-border py-6">
      <h1 className="font-semibold mb-6">Edit your Email</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-lg flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
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

export default EditEmailForm;
