import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { resendAdapter } from "@payloadcms/email-resend";
import path from "path";
import { buildConfig } from "payload";
// import sharp from 'sharp'
import { fileURLToPath } from "url";

import { Users } from "./payload/collections/Users/Index";
import { SiteConfig } from "./payload/globals/SiteConfig";
import { ServicesPage } from "./payload/globals/ServicesPage/Index";
import { Services } from "./payload/collections/Services";
import { HomePage } from "./payload/globals/HomePage";
import { BeforeDashboard } from "@/app/components/BeforeDashboard";
import { seed } from "./app/endpoints/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    components: {
      beforeDashboard: [BeforeDashboard],
    },
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
  }),
  endpoints: [
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    {
      handler: seed,
      method: "get",
      path: "/seed",
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

  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable

  // sharp,
});
