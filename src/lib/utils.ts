import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isActiveRoute = (
  currentRouteHref: string,
  providedRouteHref: string
) => currentRouteHref.endsWith(providedRouteHref);

export const getErrorMessage = (
  error: unknown,
  defaultMessage?: string
): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = defaultMessage || "Something went wrong!";
  }
  return message;
};

export const generateSlug = (name: string) =>
  name
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^\w-]+/g, "");

export async function revalidate(path: string) {
  await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/revalidate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path }),
  });
  console.log("Revalidated path:", path);
}
