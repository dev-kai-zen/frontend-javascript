import apiClient from "../../../shared/api/api-client";

/**
 * GET /api/v1/rbac/roles/:roleId/permissions
 */
export async function fetchRolePermissions(roleId) {
  const body = await apiClient.get(
    `/api/v1/rbac/roles/${roleId}/permissions`,
  );
  return body.data ?? [];
}

/**
 * PUT /api/v1/rbac/roles/:roleId/permissions — replaces the full permission set for the role.
 */
export async function setRolePermissions(roleId, permissionIds) {
  const body = await apiClient.put(
    `/api/v1/rbac/roles/${roleId}/permissions`,
    { permissionIds },
  );
  return body.data ?? [];
}
