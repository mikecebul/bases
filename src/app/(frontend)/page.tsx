import Carf from "@/components/carf";
import FrontPageServices from "@/components/services-front-page";
import Hero from "@/components/hero";
import Donate from "@/components/donate";
import payloadConfig from "@/payload.config";
import { HomePage, Service } from "@/payload-types";
import { getPayloadHMR } from "@payloadcms/next/utilities";

export default async function Home() {
  const payload = await getPayloadHMR({
    config: payloadConfig,
  });
  const data: HomePage = await payload.findGlobal({
    slug: "home-page",
    depth: 1,
  });
  const { cta, description, title, topThreeServices } = data;

  const services = topThreeServices
    ?.map((service) => service)
    .filter((service): service is Service => service !== undefined);

  return (
    <>
      <Hero title={title} description={description} cta={cta} />
      {!!services && <FrontPageServices services={services} />}
      <Carf />
      <Donate />
    </>
  );
}
