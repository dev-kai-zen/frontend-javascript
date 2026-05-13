/**
 * Runtime helpers for the nav tree used by `routesConfig.js` and `AppRoutes.jsx`.
 * Permission fields: use one of `permission`, `permissionAny`, or `permissionAll` per item.
 */

export function isRouteNavGroup(item) {
  return item.kind === "group";
}

export function isRouteNavLeaf(item) {
  return item.kind === "leaf";
}
