import apiClient from "../../shared/api/api-client";

function buildParams(query) {
  const params = {};
  if (query.userId !== undefined && Number.isFinite(query.userId)) {
    params.userId = query.userId;
  }
  if (query.action !== undefined && query.action !== "") {
    params.action = query.action;
  }
  if (query.module !== undefined && query.module !== "") {
    params.module = query.module;
  }
  if (query.limit !== undefined) {
    params.limit = query.limit;
  }
  if (query.offset !== undefined) {
    params.offset = query.offset;
  }
  return params;
}

/**
 * GET /api/v1/user-logs — newest first (`created_at` on the server).
 */
export async function fetchUserLogs(query = {}) {
  const body = await apiClient.get("/api/v1/user-logs", {
    params: buildParams(query),
  });
  return body.data ?? [];
}
