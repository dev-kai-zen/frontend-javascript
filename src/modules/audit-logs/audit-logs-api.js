import apiClient from "../../shared/api/api-client";

function buildParams(query) {
  const params = {};
  if (query.action !== undefined && query.action !== "") {
    params.action = query.action;
  }
  if (query.entity_type !== undefined && query.entity_type !== "") {
    params.entity_type = query.entity_type;
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
 * GET /api/v1/audit-logs — newest first (`created_at` on the server).
 */
export async function fetchAuditLogs(query = {}) {
  const body = await apiClient.get("/api/v1/audit-logs", {
    params: buildParams(query),
  });
  return body.data ?? [];
}
