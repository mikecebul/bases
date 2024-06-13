import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { resendAdapter } from "@payloadcms/email-resend";
import path from "path";
import { buildConfig } from "payload/config";
// import sharp from 'sharp'
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Services } from "./globals/Services/Index";
import { SiteConfig } from "./globals/SiteConfig";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users],
  globals: [Services, SiteConfig],
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
