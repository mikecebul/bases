import Carf from "@/components/carf";
import FrontPageServices from "@/components/services-front-page";
import Hero from "@/components/hero";
import Donate from "@/components/donate";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";

export default async function Home() {
  const payload = await getPayload({
    config: payloadConfig,
  });
  const { title, description, cta, listOfServices } = await payload.findGlobal({
    slug: "home-page",
    depth: 2,
  });

  const services = listOfServices?.map((item) => {
    const { service } = item;
    if (!!service && typeof service !== "number") return service;
  });

  return (
    <>
      <Hero title={title} description={description} cta={cta} />
      {!!services && <FrontPageServices services={services} />}
      <Carf />
      <Donate />
    </>
  );
}
