import { GlobalConfig } from "payload/types";
import { revalidatePath } from "next/cache";
import { Service } from "@/payload-types";

export const ServicesPage: GlobalConfig = {
  slug: "services-page",
  label: "Services Page",
  hooks: {
    afterChange: [() => revalidatePath("/(frontend)/services", "page")],
  },
  fields: [
    {
      name: "subtitle",
      type: "text",
      defaultValue: "Redefine your recovery path",
      required: true,
    },
    {
      name: "title",
      type: "text",
      defaultValue: "Everything you need for a successful recovery journey",
      required: true,
    },
    {
      name: "description",
      type: "text",
      defaultValue:
        "With decades of experience, we&apos;ve developed services that truly serve our community&apos;s needs.",
      required: true,
    },
    {
      name: "listOfServices",
      label: "List of services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      required: true,
      defaultValue: getServices,
    },
  ],
};

async function getServices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/services`);
  const data: Service[] = await res.json();
  return data.map((service) => service.id);
}
