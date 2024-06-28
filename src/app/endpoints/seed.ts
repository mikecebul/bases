import type { PayloadHandler } from "payload";

import { seedServices } from "@/lib/seed/seedServices";

export const seed: PayloadHandler = async (req): Promise<Response> => {
  const { payload, user } = req;

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await seedServices(payload);
    return Response.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    payload.logger.error(message);
    return Response.json({ error: message }, { status: 500 });
  }
};
