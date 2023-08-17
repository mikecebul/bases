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
import { BoardMember } from "@prisma/client";

const boardFormSchema = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

type BoardFormValues = z.infer<typeof boardFormSchema>;

export default function BoardForm({
  person,
  boardMemberId,
  pathToInvalidate,
}: {
  person: BoardMember;
  boardMemberId: string;
  pathToInvalidate: string;
}) {
  const router = useRouter();

  const formStatus = {
    idle: "idle",
    loading: "loading",
    submitted: "submitted",
    error: "error",
  };
  const [status, setStatus] = useState(formStatus.idle);

  const defaultValues: Partial<BoardFormValues> = {
    name: person.name,
    role: person.role,
    bio: person.bio.map((str) => ({
      value: str,
    })),
  };

  const form = useForm<BoardFormValues>({
    resolver: zodResolver(boardFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    fields: bioFields,
    append: bioAppend,
    remove: bioRemove,
  } = useFieldArray({
    name: "bio",
    control: form.control,
  });
 
  useEffect(() => {
    if (status === formStatus.error) {
      toast({
        variant: "destructive",
        description:
          "Oops, there was an error updating the profile. Please try again.",
      });
    }

    if (status === formStatus.submitted) {
      toast({ description: "Profile was updated successfully." });
    }
  }, [formStatus.error, formStatus.submitted, status]);

  async function onSubmit(values: BoardFormValues) {
    setStatus(formStatus.loading);
    const newPersonData = values;

    try {
      const res = await fetch("/api/board/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person: newPersonData,
          boardMemberId,
        }),
      });

      if (!res.ok) {
        throw new Error("Error updating bio.");
      }

      setStatus(formStatus.submitted);
    } catch (err) {
      setStatus(formStatus.error);
      console.error(err);
    }

    try {
      const invalidateRes = await fetch(
        `/api/revalidate?path=${pathToInvalidate}&secret=${process.env.NEXT_PUBLIC_REVALIDATE_TOKEN}`
      );

      if (!invalidateRes.ok) {
        throw new Error("Error invalidating cache.");
      }
    } catch (err) {
      console.error(err);
    }

    router.refresh();
  }

  return (
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
            Add Paragraph To Bio
          </Button>
        </div>


        <div className="flex justify-end">
          <Button
            type="submit"
            variant="brand"
            disabled={status === formStatus.loading}
          >
            {status === formStatus.loading ? "Sending..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </Form>
  );
}