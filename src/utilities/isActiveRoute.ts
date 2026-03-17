export const isActiveRoute = (currentRouteHref: string, providedRouteHref: string) => {
  // Don't mark external URLs as active
  if (providedRouteHref.startsWith('http') || providedRouteHref.startsWith('//')) {
    return false
  }
  
  return (currentRouteHref === '/' && providedRouteHref === 'home') ||
    currentRouteHref.endsWith(providedRouteHref)
}
