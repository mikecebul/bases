"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { BoardMember } from "@prisma/client";
import UploadProfilePicture from "./uploadProfilePicture";
import { UpdateBoardMemberAction } from "@/actions/update-board-member-action";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { generateSlug, revalidate } from "@/lib/utils";

const boardFormSchema = z.object({
  name: z.string(),
  role: z.string(),
  imageUrl: z.string().optional(),
  status: z.union([z.literal("DRAFT"), z.literal("PUBLISHED")]),
  bio: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

type BoardFormValues = z.infer<typeof boardFormSchema>;

export default function BoardEditForm({ person }: { person: BoardMember }) {
  const router = useRouter();

  const formBoardMember = {
    ...person,
    imageUrl: person.imageUrl || undefined,
    bio: person.bio.map((str) => ({
      value: str,
    })),
  };

  const [imageUrl, setImageUrl] = useState(formBoardMember.imageUrl);

  const defaultValues: Partial<BoardFormValues> = {
    status: formBoardMember.status,
    name: formBoardMember.name,
    role: formBoardMember.role,
    imageUrl: formBoardMember.imageUrl,
    bio: formBoardMember.bio,
  };

  const form = useForm<BoardFormValues>({
    resolver: zodResolver(boardFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    formState: { isSubmitting },
  } = form;

  const {
    fields: bioFields,
    append: bioAppend,
    remove: bioRemove,
  } = useFieldArray({
    name: "bio",
    control: form.control,
  });

  async function onSubmit(values: BoardFormValues) {
    const newBoardMemberData = { ...values, imageUrl: imageUrl };
    const { id } = person;
    const result = await UpdateBoardMemberAction({
      id,
      newBoardMemberData,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        description: result.error,
      });
    } else {
      toast({ description: "Profile was updated successfully." });
      router.refresh();
      router.push("/admin/board");
      await revalidate("/team");
      await revalidate(`/team/board/${person.slug}`);
      await revalidate(`/team/board/${generateSlug(newBoardMemberData.name)}`);
    }
  }

  return (
    <div className="max-w-7xl p-8">
      <UploadProfilePicture imageUrl={imageUrl} setImageUrl={setImageUrl} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={"status"}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      {...field}
                      id="status"
                      onCheckedChange={(checked: boolean) =>
                        field.onChange(checked ? "PUBLISHED" : "DRAFT")
                      }
                      checked={field.value === "PUBLISHED"}
                    />
                    <Label htmlFor="status">
                      {field.value === "PUBLISHED" ? "Published" : "Draft"}
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"role"}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-xl font-semibold">Bio Introduction</p>
          {bioFields.map((field, index) => (
            <div key={field.id} className="p-4 rounded-md bg-accent/50">
              <FormField
                control={form.control}
                name={`bio.${index}.value`}
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Paragraph {index + 1}</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="h-32" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => bioRemove(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="default"
              onClick={() => bioAppend({ value: "" })}
            >
              Add Paragraph To Bio
            </Button>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="brand" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
