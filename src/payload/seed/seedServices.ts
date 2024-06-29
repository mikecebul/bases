import type { Payload } from "payload";
import { oldSiteConfig } from "@/app/config/site";

export const seedServices = async (payload: Payload) => {
  payload.logger.info("Seeding database...");

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

  payload.logger.info("Seeded Services successfully!");
};
