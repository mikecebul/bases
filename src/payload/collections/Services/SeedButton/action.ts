"use server";

import { oldSiteConfig } from "@/app/config/site";
import payloadConfig from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

export async function createServices() {
  const payload = await getPayloadHMR({
    config: payloadConfig,
  });
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
}
