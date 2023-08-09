"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

  const [bioElements, setBioElements] = useState(bio);
    const bioStatuses = {
    idle: "idle",
    loading: "loading",
    submitted: "submitted",
    error: "error",
  };  
  const [status, setStatus] = useState(bioStatuses.idle);
  
  const createFormSchema = (bio: string[]) => {
    let schema: { [key: string]: z.ZodString } = {};
    bio.forEach((_, index) => {
      schema[`bio${index}`] = z.string().min(3, {
        message: "Paragraph name must be at least 3 characters.",
      });
    });
    return z.object(schema);
  };
  const formSchema = createFormSchema(bioElements);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: bioElements.reduce(
      (prev, curr, index) => ({
        ...prev,
        [`bio${index}`]: curr,
      }),
      {}
    ),
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

  function handleAddBio() {
    setBioElements((prevBioElements) => [...prevBioElements, ""]);
  }

  function handleRemoveBio(index: number) {
    setBioElements((prevBioElements) =>
      prevBioElements.filter((_, i) => i !== index)
    );
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus(bioStatuses.loading);
    const bioArray = Object.values(values);

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {bioElements.map((_, index) => (
          <div key={index}>
            <FormField
              control={form.control}
              name={`bio${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paragraph {index + 1}</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="h-32" />
                  </FormControl>
                  <FormMessage />
                  <div>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveBio(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </div>
        ))}
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleAddBio}>
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
