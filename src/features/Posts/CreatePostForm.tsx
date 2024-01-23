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

import { useCreatePost } from "./useCreatePost";
import { newPost } from "@/types/allTypes";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
    imagesUrl: z.string().optional(),
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

export default function CreatePostForm({
  communityId,
}: {
  communityId: number;
}) {
  const { createPost, status } = useCreatePost();
  const isCreating: boolean = status === "pending";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      imagesUrl: "",
    },
  });

  const { isSubmitSuccessful } = form.formState;

  useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    }

    form.reset();
  }, [isSubmitSuccessful, form]);

  const title = form.watch("title");
  const content = form.watch("content");

  const handleSubmit = (
    values: z.infer<typeof formSchema>,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    const currentDate = new Date();
    const newPost: newPost = {
      title: values.title,
      content: values.content,
      imagesUrl: e.target.imagesUrl.files[0],
      CreatedAt: currentDate.toISOString(),
      communityId: communityId,
      tags: values.tags || "",
    };
    createPost(newPost);
  };
  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" disabled={isCreating}>
            Create Post
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create post</DialogTitle>
            <DialogDescription>
              Create your post here. Click post when you're done!
            </DialogDescription>
          </DialogHeader>

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

              {title && content && (
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isCreating}
                    >
                      Post
                    </Button>
                  </DialogClose>
                </DialogFooter>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
