import type { PayloadHandler } from "payload";
import { oldSiteConfig } from "../config/site";
import { revalidatePath } from "next/cache";

export const seedServices: PayloadHandler = async (req): Promise<Response> => {
  const { payload, user } = req;

  if (user?.role !== "superAdmin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

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
    return Response.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    payload.logger.error(message);
    return Response.json({ error: message }, { status: 500 });
  }
};
