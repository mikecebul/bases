export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/wp/:path*", "/old-admin/:path*"],
};
