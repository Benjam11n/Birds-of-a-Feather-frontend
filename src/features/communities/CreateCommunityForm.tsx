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

import { newCommunity } from "@/types/allTypes";
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
import { useCreateCommunity } from "./useCreateCommunity";
import { useEffect } from "react";

const formSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    communityIcon: z.string().optional(),
    category: z
      .enum([
        "General Bird Care",
        "Bird Watching",
        "Veterinary Care",
        "Breeding and Reproduction",
        "Conservation and Environmental Issues",
        "Events and Competitions",
        "Marketplace",
        "Others",
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
  );

export default function CreateCommunityForm() {
  const { createCommunity, status } = useCreateCommunity();
  const isCreating: boolean = status === "pending";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      communityIcon: "",
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

  const handleSubmit = (
    values: z.infer<typeof formSchema>,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const currentDate = new Date();
    const iconFile = (
      e.currentTarget.elements.namedItem("communityIcon") as HTMLInputElement
    )?.files?.[0];

    const newCommunity: newCommunity = {
      title: values.title,
      description: values.description,
      CreatedAt: currentDate.toISOString(),
      iconUrl: iconFile || "",
      category: values.category || "",
    };

    createCommunity(newCommunity);
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={isCreating}>Create Community</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create community</DialogTitle>
            <DialogDescription>
              Create your community here. Click create when you're done!
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              encType="multipart/form-data"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                form.handleSubmit((values) => handleSubmit(values, e))
              }
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
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Introduce your community!"
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
                name="communityIcon"
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
                name="category"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Category" {...field} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="General Bird Care">
                            General Bird Care
                          </SelectItem>
                          <SelectItem value="Bird Watching">
                            Bird Watching
                          </SelectItem>
                          <SelectItem value="Veterinary Care">
                            Veterinary Care
                          </SelectItem>
                          <SelectItem value="Breeding and Reproduction">
                            Breeding and Reproduction
                          </SelectItem>
                          <SelectItem value="Conservation and Environmental Issues">
                            Conservation and Environmental Issues
                          </SelectItem>
                          <SelectItem value="Events and Competitions">
                            Events and Competitions
                          </SelectItem>
                          <SelectItem value="Marketplace">
                            Marketplace
                          </SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {title && (
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isCreating}
                    >
                      Create
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
