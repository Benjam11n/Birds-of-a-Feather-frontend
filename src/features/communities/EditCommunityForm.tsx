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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { community, newCommunity } from "@/types/allTypes";

import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import useUpdateCommunity from "./useUpdateCommunity";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    title: z.string(),
    description: z.string(),
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

export default function EditCommunityForm({
  communityToEdit,
}: {
  communityToEdit: community;
}) {
  const {
    ID: communityId,
    title,
    description,
    category,
    CreatedAt,
    iconUrl,
  } = communityToEdit;
  const { updateCommunity, status } = useUpdateCommunity(communityId);
  const isEditingCommunity: boolean = status === "pending";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      category: category as
        | "General Bird Care"
        | "Bird Watching"
        | "Veterinary Care"
        | "Breeding and Reproduction"
        | "Conservation and Environmental Issues"
        | "Events and Competitions"
        | "Marketplace"
        | "Others"
        | undefined,
    },
  });

  const { isSubmitSuccessful } = form.formState;

  useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    }

    form.reset();
  }, [isSubmitSuccessful, form]);

  // to check if description is not empty
  const formContent = form.watch("description");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newCommunity: newCommunity = {
      title: values.title,
      description: values.description,
      category: values.category || "",
      CreatedAt: CreatedAt,
      iconUrl,
    };
    updateCommunity({ communityId, newCommunity: newCommunity });
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
                      <SelectItem value="Marketplace">Marketplace</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
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
                  disabled={isEditingCommunity}
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
