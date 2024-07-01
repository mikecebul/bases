"use server";

import { oldSiteConfig } from "@/app/config/site";
import payloadConfig from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { revalidatePath } from "next/cache";

export async function createServices(req: any) {
  console.log("Req:", req);
  const payload = await getPayloadHMR({
    config: payloadConfig,
  });

  try {
    oldSiteConfig.Services.forEach(
      async (service) =>
        await payload.create({
          collection: "services",
          data: {
            title: service.name,
            desc: service.description,
            icon: service.icon,
          },
        })
    );
    revalidatePath("/(payload)/admin/collections/services", "page");
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    payload.logger.error(message);
    return { error: message };
  }
}
