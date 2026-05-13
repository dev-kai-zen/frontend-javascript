import apiClient from "../../shared/api/api-client";

/**
 * GET /api/v1/rbac/users/:userId/roles
 */
export async function fetchUserRoles(userId) {
  const body = await apiClient.get(`/api/v1/rbac/users/${userId}/roles`);
  return body.data ?? [];
}

/**
 * PUT /api/v1/rbac/users/:userId/roles — full replace for that user.
 */
export async function setUserRoles(userId, payload) {
  const body = await apiClient.put(`/api/v1/rbac/users/${userId}/roles`, {
    roleIds: payload.roleIds,
    assignedBy: payload.assignedBy,
  });
  return body.data ?? [];
}
