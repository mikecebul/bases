import Carf from "@/components/carf";
import FrontPageServices from "@/components/services-front-page";
import Hero from "@/components/hero";
import Donate from "@/components/donate";
import payloadConfig from "@/payload.config";
import { Service } from "@/payload-types";
import { getPayloadHMR } from "@payloadcms/next/utilities";

export default async function Home() {
  const payload = await getPayloadHMR({
    config: payloadConfig,
  });
  const data = await payload.findGlobal({
    slug: "home-page",
    depth: 1,
  });
  const { cta, description, title, topThreeServices } = data;

  const isServices = (list: (number | Service)[]): list is Service[] => {
    return list.every((item) => (item as Service).title !== undefined);
  };

  return (
    <>
      <Hero title={title} description={description} cta={cta} />
      {isServices(topThreeServices) && (
        <FrontPageServices services={topThreeServices} />
      )}
      <Carf />
      <Donate />
    </>
  );
}
