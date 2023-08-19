export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/wp/:path*", "/admin/:path*"],
};
