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
  const data = await payload.findGlobal({
    slug: "services",
    depth: 2,
  });

  const services = data.services as Service["services"];
  const firstThreeServices = !!services ? services.slice(0, 3) : null;

  return (
    <>
      <Hero />
      {!!firstThreeServices && (
        <FrontPageServices
          services={firstThreeServices as Service["services"]}
        />
      )}
      <Carf />
      <Donate />
    </>
  );
}
