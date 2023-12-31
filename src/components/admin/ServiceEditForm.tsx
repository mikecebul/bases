"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Service } from "@prisma/client";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { UpdateServiceAction } from "@/actions/update-service-action";
import { Textarea } from "../ui/textarea";
import { IconComboBox } from "./iconCombobox";
import { revalidate } from "@/lib/utils";

const ServiceFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  frontpage: z.boolean(),
  status: z.union([z.literal("DRAFT"), z.literal("PUBLISHED")]),
});

type ServiceFormValues = z.infer<typeof ServiceFormSchema>;

export default function ServiceEditForm({ service }: { service: Service }) {
  const router = useRouter();

  const defaultValues: Partial<ServiceFormValues> = {
    status: service.status,
    frontpage: service.frontpage,
    name: service.name,
    description: service.description,
    icon: service.icon,
  };

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(ServiceFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ServiceFormValues) {
    const { id } = service;
    const result = await UpdateServiceAction({
      id,
      values,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        description: result.error,
      });
    } else {
      toast({ description: "Service was updated successfully." });
      router.refresh();
      router.push("/admin/services");
      await revalidate("/");
      await revalidate("/services");
    }
  }

  return (
    <div className="p-8 max-w-7xl">
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
            name={"frontpage"}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Front Page</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="frontpage"
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                    <Label htmlFor="frontpage">
                      {field.value ? "Yes" : "No"}
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"icon"}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <IconComboBox
                      icon={field.value}
                      setIcon={(name, value) => form.setValue("icon", value)}
                    />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
