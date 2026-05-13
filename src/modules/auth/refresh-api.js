import axios from "axios";

import { getEnv } from "../../shared/config/env";

/**
 * Uses plain Axios (not `apiClient`) so a 401 does not trigger an infinite
 * refresh loop.
 */
export async function postRefresh() {
  const { apiBaseUrl } = getEnv();
  const prefix = apiBaseUrl.replace(/\/$/, "");
  const url = `${prefix}/api/v1/google-auth/refresh`;
  const { data } = await axios.post(url, {}, { withCredentials: true });
  return data;
}
