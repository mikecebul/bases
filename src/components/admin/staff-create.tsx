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

const staffFormSchema = z.object({
  name: z.string(),
  role: z.string(),
  qualifications: z.string().optional(),
  imageUrl: z.string().optional(),
  bio: z.array(
    z.object({
      value: z.string(),
    })
  ),
  philosophy: z.array(
    z.object({
      value: z.string(),
    })
  ),
  education: z.array(
    z.object({
      value: z.string(),
    })
  ),
  specializations: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

export default function StaffCreate() {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const formStatus = {
    idle: "idle",
    loading: "loading",
    submitted: "submitted",
    error: "error",
  };
  const [status, setStatus] = useState(formStatus.idle);

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
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
  const {
    fields: philosophyFields,
    append: philosophyAppend,
    remove: philosophyRemove,
  } = useFieldArray({
    name: "philosophy",
    control: form.control,
  });
  const {
    fields: educationFields,
    append: educationAppend,
    remove: educationRemove,
  } = useFieldArray({
    name: "education",
    control: form.control,
  });
  const {
    fields: specializationsFields,
    append: specializationsAppend,
    remove: specializationsRemove,
  } = useFieldArray({
    name: "specializations",
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

  async function onSubmit(values: StaffFormValues) {
    setStatus(formStatus.loading);
    const newPersonData = values;
    newPersonData.imageUrl = imageUrl;

    try {
      const res = await fetch("/api/staff/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person: newPersonData,
        }),
      });

      if (!res.ok) {
        throw new Error("Error creating new staff member.");
      }

      setStatus(formStatus.submitted);
    } catch (err) {
      setStatus(formStatus.error);
      console.error(err);
    }

    try {
      const invalidateRes = await fetch(
        `/api/revalidate?path=/team&secret=${process.env.NEXT_PUBLIC_REVALIDATE_TOKEN}`
      );

      if (!invalidateRes.ok) {
        throw new Error("Error invalidating cache.");
      }
    } catch (err) {
      console.error(err);
    }

    form.reset();
    router.push("/admin/staff")
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
          <FormField
            control={form.control}
            name={"qualifications"}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Qualifications</FormLabel>
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

          <p className="text-xl font-semibold">
            Treatment Philosophy and Focus
          </p>
          {philosophyFields.map((field, index) => (
            <div key={field.id} className="p-4 rounded-md bg-accent/50">
              <FormField
                control={form.control}
                name={`philosophy.${index}.value`}
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
                  onClick={() => philosophyRemove(index)}
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
              onClick={() => philosophyAppend({ value: "" })}
            >
              Add Paragraph To Philosophy
            </Button>
          </div>
          <p className="text-xl font-semibold">Education</p>
          {educationFields.map((field, index) => (
            <div key={field.id} className="p-4 rounded-md bg-accent/50">
              <FormField
                control={form.control}
                name={`education.${index}.value`}
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
                  onClick={() => educationRemove(index)}
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
              onClick={() => educationAppend({ value: "" })}
            >
              Add Paragraph To Education
            </Button>
          </div>
          <p className="text-xl font-semibold">Specializations</p>
          {specializationsFields.map((field, index) => (
            <div key={field.id} className="p-4 rounded-md bg-accent/50">
              <FormField
                control={form.control}
                name={`specializations.${index}.value`}
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Specialization {index + 1}</FormLabel>
                    <FormControl>
                      <Input {...field} className="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => specializationsRemove(index)}
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
              onClick={() => specializationsAppend({ value: "" })}
            >
              Add A Speciaization
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
    </div>
  );
}
