import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://bases-ten.vercel.com',
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/about-us`|| 'https://bases-ten.vercel.com/about-us',
      lastModified: new Date(),
    },
  ];
}
