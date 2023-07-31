import AboutSection from "@/components/about-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the history and future plans for BASES (Bay Area Substance Education Services).",
};

export default function AboutUs() {
  return <AboutSection />;
}
