import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isActiveRoute = (
  currentRouteHref: string,
  providedRouteHref: string
) => currentRouteHref.endsWith(providedRouteHref);

export const isActiveMenuItem = (
  currentRouteHref: string,
  providedRouteHref: string
) => currentRouteHref.includes(providedRouteHref);
