export const isActiveRoute = (currentRouteHref: string, providedRouteHref: string) =>
  currentRouteHref.endsWith(providedRouteHref)
