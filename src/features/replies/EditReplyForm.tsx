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

import { useEditReply } from "./useEditReply";
import { reply } from "@/types/allTypes";
import { newReply } from "@/types/allTypes";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

const formSchema = z
  .object({
    content: z.string(),
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

export default function EditReplyForm({ replyToEdit }: { replyToEdit: reply }) {
  const { editReply, status } = useEditReply(replyToEdit.parentId);
  const isEditingReply: boolean = status === "pending";
  const { parentId, ID: replyId, content, imagesUrl } = replyToEdit;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content || "",
    },
  });

  const { isSubmitSuccessful } = form.formState;

  useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    }

    form.reset();
  }, [isSubmitSuccessful, form]);

  // to check if content is not empty
  const formContent = form.watch("content");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newReply: newReply = {
      content: values.content,
      imagesUrl,
      parentId,
      CreatedAt: new Date().toISOString(),
    };
    editReply({ replyId, newReply: newReply });
  };

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form
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

          {formContent && (
            <AlertDialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isEditingReply}
                >
                  Save
                </Button>
              </DialogClose>
            </AlertDialogFooter>
          )}
        </form>
      </Form>
    </div>
  );
}
