import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/ahse", "/wp", "/heal"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/sitemap.xml`,
  };
}
