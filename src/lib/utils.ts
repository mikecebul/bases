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
  try {
    const invalidateRes = await fetch(
      `/api/revalidate?path=${path}&secret=${process.env.NEXT_PUBLIC_REVALIDATE_TOKEN}`
    );

    if (!invalidateRes.ok) {
      throw new Error('Error invalidating "/services" cache.');
    }
    if (invalidateRes.ok) {
      console.log("Revalidation Completed Successfully!");
    }
  } catch (err) {
    console.error(err);
  }
}
