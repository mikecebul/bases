import Services from "@/components/services";
import payloadConfig from "@/payload.config";
import { Metadata } from "next";
import { getPayload } from "payload";
import React from "react";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore all the recovery services provided at BASES.",
};

export default async function Page() {
  const payload = await getPayload({
    config: payloadConfig,
  });
  const pageData = await payload.findGlobal({
    slug: "services-page",
    depth: 1,
  });

  return <Services pageData={pageData} />;
}
