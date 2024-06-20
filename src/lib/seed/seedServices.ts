import { oldSiteConfig } from "@/config/site";
import payloadConfig from "@/payload.config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

export async function seedServices() {
  const payload = await getPayloadHMR({ config: payloadConfig });

  const services = oldSiteConfig.Services.forEach(
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
  return console.log("Services Seeded:");
}
