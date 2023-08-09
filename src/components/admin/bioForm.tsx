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

const bioFormSchema = z.object({
  bio: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

type BioFormValues = z.infer<typeof bioFormSchema>;

export default function BioForm({
  bio,
  staffMemberId,
  pathToInvalidate,
}: {
  bio: string[];
  staffMemberId: string;
  pathToInvalidate: string;
}) {
  const router = useRouter();

  const bioStatuses = {
    idle: "idle",
    loading: "loading",
    submitted: "submitted",
    error: "error",
  };
  const [status, setStatus] = useState(bioStatuses.idle);

  const defaultValues: Partial<BioFormValues> = {
    bio: bio.map((str) => ({
      value: str,
    })),
  };

  const form = useForm<BioFormValues>({
    resolver: zodResolver(bioFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "bio",
    control: form.control,
  });

  useEffect(() => {
    if (status === bioStatuses.error) {
      toast({
        variant: "destructive",
        description:
          "Oops, there was an error sending your email. Please try again.",
      });
    }

    if (status === bioStatuses.submitted) {
      toast({ description: "Your message was sent successfully." });
    }
  }, [bioStatuses.error, bioStatuses.submitted, status]);

  async function onSubmit(values: BioFormValues) {
    setStatus(bioStatuses.loading);
    const bioArray = values.bio.map((bioObj) => bioObj.value);

    try {
      const res = await fetch("/api/staff/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: bioArray,
          staffMemberId,
        }),
      });

      if (!res.ok) {
        throw new Error("Error updating bio.");
      }

      setStatus(bioStatuses.submitted);
    } catch (err) {
      setStatus(bioStatuses.error);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col w-2/3 gap-8">
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
            <div className="flex justify-end">
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
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
            onClick={() => append({ value: "" })}
          >
            Add Paragraph
          </Button>
          <Button
            type="submit"
            variant="brand"
            disabled={status === bioStatuses.loading}
          >
            {status === bioStatuses.loading ? "Sending..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
