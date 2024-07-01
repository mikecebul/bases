import Services from "@/app/components/services";
import payloadConfig from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore all the recovery services provided at BASES.",
};

export default async function Page() {
  const payload = await getPayloadHMR({
    config: payloadConfig,
  });
  const pageData = await payload.findGlobal({
    slug: "services-page",
    depth: 1,
  });

  return <Services pageData={pageData} />;
}
