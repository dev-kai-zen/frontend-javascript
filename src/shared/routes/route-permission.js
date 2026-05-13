import { isRouteNavGroup } from "./route-nav-types";

const SUPER_ADMIN_ROLE = "super_admin";

function passesPermissionFields(permissionCodes, roleName, item) {
  if (roleName === SUPER_ADMIN_ROLE) return true;

  const has = (p) => permissionCodes.includes(p);

  if (item.permissionAll?.length) {
    return item.permissionAll.every(has);
  }
  if (item.permissionAny?.length) {
    return item.permissionAny.some(has);
  }
  return true;
}

/** Whether the current user may open this route or see this nav row. */
export function viewerMayAccessNavItem(permissionCodes, roleName, item) {
  return passesPermissionFields(permissionCodes, roleName, item);
}

/**
 * Nav tree with `hidden` items already removed — drop rows the user’s role
 * cannot access. Empty groups disappear.
 */
export function filterNavTreeByPermissions(
  items,
  permissionCodes,
  roleName,
) {
  const out = [];

  for (const item of items) {
    if (isRouteNavGroup(item)) {
      const children = filterNavTreeByPermissions(
        item.children,
        permissionCodes,
        roleName,
      );
      if (children.length === 0) continue;
      if (!viewerMayAccessNavItem(permissionCodes, roleName, item)) continue;
      out.push({ ...item, children });
    } else if (viewerMayAccessNavItem(permissionCodes, roleName, item)) {
      out.push(item);
    }
  }

  return out;
}
