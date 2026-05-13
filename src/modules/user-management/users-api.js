import apiClient from "../../shared/api/api-client";

/**
 * GET /api/v1/users
 * @param options.isActive optional filter
 * @param options.roleId optional — only users assigned this RBAC role
 */
export async function fetchUsersForAdmin(options) {
  const params = new URLSearchParams();
  if (options?.isActive === true) params.set("isActive", "true");
  if (options?.isActive === false) params.set("isActive", "false");
  if (options?.roleId !== undefined && Number.isFinite(options.roleId)) {
    params.set("roleId", String(options.roleId));
  }
  const q = params.toString();
  const url = q ? `/api/v1/users?${q}` : "/api/v1/users";
  const body = await apiClient.get(url);
  return body.data ?? [];
}

/**
 * PATCH /api/v1/users/:id — partial update (camelCase body matches backend Zod schemas).
 */
export async function updateUserAdmin(id, payload) {
  return apiClient.patch(`/api/v1/users/${id}`, payload);
}

/**
 * DELETE /api/v1/users/:id
 */
export async function deleteUserAdmin(id) {
  await apiClient.delete(`/api/v1/users/${id}`);
}
