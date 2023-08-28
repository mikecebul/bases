"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import FirstStaffProfilePicture from "./first-staff-profile-picture";
import { CreateBoardMemberAction } from "@/actions/create-board-member-action";
import { generateSlug, revalidate } from "@/lib/utils";

const boardFormSchema = z.object({
  name: z.string(),
  role: z.string(),
  imageUrl: z.string().optional(),
  bio: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

type BoardFormValues = z.infer<typeof boardFormSchema>;

export default function BoardCreateForm() {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const form = useForm<BoardFormValues>({
    resolver: zodResolver(boardFormSchema),
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

    const result = await CreateBoardMemberAction({
      newBoardMemberData,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        description: result.error,
      });
    } else {
      toast({ description: "Profile was updated successfully." });
      router.push("/admin/board");
      await revalidate("/team");
      await revalidate(`/team/board/${generateSlug(newBoardMemberData.name)}`);
    }
  }

  return (
    <div className="max-w-7xl p-8">
      <FirstStaffProfilePicture imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onInvalid={() => console.log("Form is invalid")}
          className="space-y-8"
        >
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
              Add Paragraph To Introduction
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
