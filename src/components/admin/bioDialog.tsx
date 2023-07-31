"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface BioPopoverProps {
  bio: string[];
}

export default function BioDialog({ bio }: BioPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Staff Member Bio</DialogTitle>
          <DialogDescription className="pb-8">
            Make changes to your bio here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <BioForm onSubmitted={() => setOpen(false)} bio={bio} />
        <DialogFooter>
          <Button variant="brand" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface BioFormProps {
  bio: string[];
  onSubmitted: () => void;
}

export function BioForm({ bio, onSubmitted }: BioFormProps) {
  const createFormSchema = (bio: string[]): z.ZodObject<any, any, any, any> => {
    let schema: { [key: string]: z.ZodString } = {};
    bio.forEach((item, index) => {
      schema[`bio${index}`] = z.string().min(3, {
        message: "Paragraph name must be at least 3 characters.",
      });
    });
    return z.object(schema);
  };

  const formSchema = createFormSchema(bio);

  const bioStatuses = {
    idle: "idle",
    loading: "loading",
    submitted: "submitted",
    error: "error",
  };

  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const [status, setStatus] = useState(bioStatuses.idle);

  const abortLongFetch = new AbortController();
  let abortTimeoutId;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: bio.reduce(
      (prev, curr, index) => ({
        ...prev,
        [`bio${index}`]: curr,
      }),
      {}
    ),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Set the status to loading
    setStatus(bioStatuses.loading);
    // Set the timeout for fetch
    abortTimeoutId = setTimeout(() => abortLongFetch.abort(), 7000);
    // Fetch data
    try {
      const res = await fetch("/api/contact", {
        signal: abortLongFetch.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Whoops! Error sending email.");
      }

      clearTimeout(abortTimeoutId);
      const data = await res.json();

      setStatus(bioStatuses.submitted);
      form.reset();
      wait().then(() => onSubmitted());
    } catch (err) {
      setStatus(bioStatuses.error);
      console.error(err);
    }
  }

  if (status === bioStatuses.error)
    toast({
      variant: "destructive",
      description:
        "Oops, there was an error sending your email. Please try again.",
    });
  if (status === bioStatuses.submitted)
    toast({ description: "Your message was sent successfully." });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {bio.map((bio, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`bio${index}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paragraph {index + 1}</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="submit"
          variant="brand"
          disabled={status === bioStatuses.loading}
        >
          {status === bioStatuses.loading ? "Sending..." : "Submit Request"}
        </Button>
      </form>
    </Form>
  );
}
