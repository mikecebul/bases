import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const URL = process.env.NEXT_PUBLIC_DOMAIN_URL
  const newDate = new Date().toISOString()

  const staff = await prisma.staffMember.findMany();
  const staffPages = staff.map((person) => ({
    url: `${URL}/team/staff/${person.slug}`,
    lastModified: newDate
  }));

  const boardMembers = siteConfig.team.boardMembers
  const boardMemberPages = boardMembers.map((person) => ({
    url: `${URL}/team/board-members/${person.slug}`,
    lastModified: newDate
  }));

  const routes = siteConfig.NavLinks.map((route) => ({
    url: `${URL}${route.href}`,
    lastModified: newDate
  }))

  return [...routes, ...boardMemberPages, ...staffPages];
}
