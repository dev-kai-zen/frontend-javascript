import apiClient from "../../../shared/api/api-client";

/**
 * GET /api/v1/rbac/categories
 */
export async function fetchRbacCategories() {
  const body = await apiClient.get("/api/v1/rbac/categories");
  return body.data ?? [];
}

export async function createRbacCategory(payload) {
  return apiClient.post("/api/v1/rbac/categories", {
    categoryName: payload.categoryName.trim(),
  });
}

export async function updateRbacCategory(id, payload) {
  return apiClient.patch(`/api/v1/rbac/categories/${id}`, {
    categoryName: payload.categoryName.trim(),
  });
}

export async function deleteRbacCategory(id) {
  await apiClient.delete(`/api/v1/rbac/categories/${id}`);
}
