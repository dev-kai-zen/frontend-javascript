import apiClient from "../../../shared/api/api-client";

function buildListUrl(categoryId) {
  const base = "/api/v1/rbac/permissions";
  if (categoryId === undefined || !Number.isFinite(categoryId)) {
    return base;
  }
  return `${base}?categoryId=${encodeURIComponent(String(categoryId))}`;
}

/**
 * GET /api/v1/rbac/permissions
 * @param categoryId optional filter (matches backend `listPermissionsQuerySchema`)
 */
export async function fetchRbacPermissions(categoryId) {
  const body = await apiClient.get(buildListUrl(categoryId));
  return body.data ?? [];
}

export async function createRbacPermission(payload) {
  return apiClient.post("/api/v1/rbac/permissions", {
    permissionCode: payload.permissionCode,
    permissionDescription: payload.permissionDescription ?? null,
    categoryId:
      payload.categoryId === undefined || payload.categoryId === null
        ? null
        : payload.categoryId,
  });
}

export async function updateRbacPermission(id, payload) {
  return apiClient.patch(`/api/v1/rbac/permissions/${id}`, {
    ...(payload.permissionCode !== undefined && {
      permissionCode: payload.permissionCode,
    }),
    ...(payload.permissionDescription !== undefined && {
      permissionDescription: payload.permissionDescription,
    }),
    ...(payload.categoryId !== undefined && { categoryId: payload.categoryId }),
    ...(payload.isActive !== undefined && { isActive: payload.isActive }),
  });
}

export async function deleteRbacPermission(id) {
  await apiClient.delete(`/api/v1/rbac/permissions/${id}`);
}
