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
import { useUpdateUserPassword } from "./useUpdateUserPassword";
import { useCurrentUser } from "@/features/users/useCurrentUser";
import Spinner from "@/ui/Spinner";
import { newUserPassword } from "@/types/allTypes";
import { useEffect } from "react";

const formSchema = z
  .object({
    currentPassword: z.string().min(3),
    newPassword: z.string().min(3),
    newPasswordConfirm: z.string().min(3),
  })
  .refine(
    (data) => {
      return data.newPassword === data.newPasswordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["newPasswordConfirm"],
    }
  );

function EditPasswordForm() {
  const { currentUser, isLoading } = useCurrentUser();
  const { updateUserPassword, status } = useUpdateUserPassword();
  const isUpdating: boolean = status === "pending";

  const { ID, email } = currentUser!;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
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
    const newUser: newUserPassword = {
      email,
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    updateUserPassword({ userId: ID, newUser });
  };

  return (
    <div className="flex items-center flex-col border-b border-border py-6">
      <h1 className="font-semibold mb-6">Edit your Password</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-lg  flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Current password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="newPasswordConfirm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confrim new password"
                      type="password"
                      {...field}
                    />
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

export default EditPasswordForm;
