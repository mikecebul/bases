import Carf from "@/components/carf";
import FrontPageServices from "@/components/services-front-page";
import Hero from "@/components/hero";
import Donate from "@/components/donate";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { Service } from "@/payload-types";

export default async function Home() {
  const payload = await getPayload({
    config: payloadConfig,
  });
  const { topThreeServices } = await payload.findGlobal({
    slug: "site-config",
  });

  return (
    <>
      <Hero />
      {Boolean(topThreeServices) && (
        <FrontPageServices services={topThreeServices as Service[]} />
      )}
      <Carf />
      <Donate />
    </>
  );
}
