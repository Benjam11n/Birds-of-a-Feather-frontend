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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { post, newPost } from "@/types/allTypes";
import { useEditPost } from "./useEditPost";
import { DialogClose } from "@/components/ui/dialog";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

const availableTags = [
  "Introduction",
  "Help",
  "Discussion",
  "Announcement",
  "Event",
  "Question",
  "Feedback",
];

const formSchema = z
  .object({
    title: z.string(),
    content: z.string(),
    tags: z
      .enum([
        "Introduction",
        "Help",
        "Discussion",
        "Announcement",
        "Event",
        "Question",
        "Feedback",
      ])
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.title) {
        return false;
      }
      return true;
    },
    {
      message: "Title is required",
      path: ["title"],
    }
  )
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

export default function EditPostForm({ postToEdit }: { postToEdit: post }) {
  const { editPost, status } = useEditPost();
  const isEditing: boolean = status === "pending";

  const {
    ID: postId,
    content,
    title,
    communityId,
    CreatedAt,
    imagesUrl,
  } = postToEdit;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      content: content,
    },
  });

  // to check if the title and content are not empty
  // only render the edit button if the content and title are not empty
  const formTitle = form.watch("title");
  const formContent = form.watch("content");
  const { isSubmitSuccessful } = form.formState;

  useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    }

    form.reset();
  }, [isSubmitSuccessful, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newPost: newPost = {
      title: values.title,
      content: values.content,
      CreatedAt,
      communityId,
      tags: values.tags || "",
      imagesUrl: imagesUrl,
    };
    editPost({ id: postId, newPost });
  };

  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
        <form
          encType="multipart/form-data"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-md flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What do you wish to say?"
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
            name="tags"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tags" {...field} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableTags.map((tag: string) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {formContent && formTitle && (
            <AlertDialogFooter>
              <DialogClose asChild>
                <Button type="submit" className="w-full" disabled={isEditing}>
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
