"use client";

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
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import FirstStaffProfilePicture from "./first-staff-profile-picture";
import { CreateStaffMemberAction } from "@/actions/create-staff-member-action";
import { generateSlug, revalidate } from "@/lib/utils";

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

export default function StaffCreateForm() {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
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

  async function onSubmit(values: StaffFormValues) {
    const newStaffMemberData = { ...values, imageUrl: imageUrl };

    const result = await CreateStaffMemberAction({
      newStaffMemberData,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        description: result.error,
      });
    } else {
      toast({ description: "Profile was updated successfully." });
      router.refresh()
      router.push("/admin/staff");
      await revalidate("/team")
      await revalidate(`/team/staff/${generateSlug(newStaffMemberData.name)}`)
    }
  }

  return (
    <div className="p-8 max-w-7xl">
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
            <Button type="submit" variant="brand" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
