import apiClient from "../../../shared/api/api-client";

/**
 * GET /api/v1/rbac/roles
 */
export async function fetchRbacRoles() {
  const body = await apiClient.get("/api/v1/rbac/roles");
  return body.data ?? [];
}

export async function createRbacRole(payload) {
  return apiClient.post("/api/v1/rbac/roles", {
    roleName: payload.roleName.trim(),
    roleDescription:
      payload.roleDescription === undefined || payload.roleDescription === ""
        ? null
        : payload.roleDescription,
  });
}

export async function updateRbacRole(id, payload) {
  const body = {};
  if (payload.roleName !== undefined) {
    body.roleName = payload.roleName.trim();
  }
  if (payload.roleDescription !== undefined) {
    body.roleDescription =
      payload.roleDescription === "" ? null : payload.roleDescription;
  }
  if (payload.isActive !== undefined) {
    body.isActive = payload.isActive;
  }
  return apiClient.patch(`/api/v1/rbac/roles/${id}`, body);
}

export async function deleteRbacRole(id) {
  await apiClient.delete(`/api/v1/rbac/roles/${id}`);
}
