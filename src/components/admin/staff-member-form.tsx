"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = {
  data: {
    bio: string;
  }[];
};

export default function StaffMemberForm({
  bio,
  staffMemberId,
  pathToInvalidate,
}: {
  bio: string[];
  staffMemberId: string;
  pathToInvalidate: string;
}) {
  const router = useRouter();

  const bioSchema = z.object({
    data: z.array(
      z.object({
        bio: z.string().min(3, {
          message: "Paragraph name must be at least 3 characters.",
        }),
      })
    ),
  });

  const { register, control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      data: bio.map((paragraph) => ({ bio: paragraph })),
    },
    resolver: zodResolver(bioSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "data",
  });

  // ... other state variables and functions
  const [bioElements, setBioElements] = useState(bio);
  const bioStatuses = {
    idle: "idle",
    loading: "loading",
    submitted: "submitted",
    error: "error",
  };
  const [status, setStatus] = useState(bioStatuses.idle);

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

  async function onSubmit(values: FormValues) {
    setStatus(bioStatuses.loading);
    const bioArray = values.data.map((item) => item.bio);

    try {
      const res = await fetch("/api/staff/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: bioArray,
          staffMemberId,
          pathToInvalidate,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {fields.map((item, index) => (
        <div key={item.id}>
            <FormField>

          <FormItem>
            <FormLabel>Paragraph {index + 1}</FormLabel>
            <FormControl>
              <Controller
                name={`data.${index}.bio`}
                control={control}
                render={({ field }) => <Textarea {...field} className="h-32" />}
                />
            </FormControl>
            <FormMessage />
            <div>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => remove(index)}
                >
                Delete
              </Button>
            </div>
          </FormItem>
          </FormField>
        </div>
      ))}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ bio: "" })}
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
  );
}
