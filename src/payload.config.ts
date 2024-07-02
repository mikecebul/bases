import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { resendAdapter } from "@payloadcms/email-resend";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Users } from "./payload/collections/Users/Index";
import { SiteConfig } from "./payload/globals/SiteConfig";
import { ServicesPage } from "./payload/globals/ServicesPage/Index";
import { Services } from "./payload/collections/Services";
import { HomePage } from "./payload/globals/HomePage";
import { seedServices } from "./app/endpoints/seedServices";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Services, Users],
  globals: [SiteConfig, HomePage, ServicesPage],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || "",
    },
    migrationDir: "./src/payload/migrations",
  }),
  endpoints: [
    {
      handler: seedServices,
      method: "get",
      path: "/seed-services",
    },
  ],
  email:
    process.env.RESEND_DEFAULT_EMAIL && process.env.AUTH_RESEND_KEY
      ? resendAdapter({
          defaultFromAddress: process.env.RESEND_DEFAULT_EMAIL,
          defaultFromName: "Payload Admin",
          apiKey: process.env.AUTH_RESEND_KEY || "",
        })
      : undefined,
  sharp,
});
