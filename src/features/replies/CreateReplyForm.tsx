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
import { Button } from "@/components/ui/button";

import { useCreateReply } from "./useCreateReply";
import { newReply } from "@/types/allTypes";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    content: z.string(),
    imagesUrl: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.content) {
        return false;
      }
      return true;
    },
    {
      message: "Content is required",
      path: ["content"],
    }
  );

export default function CreateReplyForm({ postId }: { postId: number }) {
  const { createReply, status } = useCreateReply(postId);
  const isCreatingReply: boolean = status === "pending";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      imagesUrl: "",
    },
  });

  const formContent = form.watch("content");

  const { isSubmitSuccessful } = form.formState;

  useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    }

    form.reset();
  }, [isSubmitSuccessful, form]);

  const handleSubmit = (
    values: z.infer<typeof formSchema>,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    const newReply: newReply = {
      content: values.content,
      parentId: postId,
      imagesUrl: e.target.imagesUrl.files[0],
      CreatedAt: new Date().toISOString(),
    };
    createReply(newReply);
  };

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form
          encType="multipart/form-data"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What do you wish to reply?"
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
            name="imagesUrl"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Upload your image</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <AlertDialogFooter>
            {formContent && (
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isCreatingReply}
                >
                  Reply
                </Button>
              </DialogClose>
            )}
          </AlertDialogFooter>
        </form>
      </Form>
    </div>
  );
}
