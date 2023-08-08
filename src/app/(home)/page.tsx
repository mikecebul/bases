import Carf from "@/components/carf";
import FrontPageServices from "@/components/services-front-page";
import Hero from "@/components/hero";
import Donate from "@/components/donate";

export default function Home() {
  return (
    <>
      <Hero />
      <FrontPageServices />
      <Carf />
      <Donate />
    </>
  );
}
