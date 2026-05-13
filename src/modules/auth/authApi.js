import apiClient from "../../shared/api/api-client";

/**
 * @typedef {object} AuthUser
 * @property {number} id
 * @property {string | null} google_id
 * @property {string} name
 * @property {string} email
 * @property {string} picture
 * @property {number | null} role_id
 * @property {{ role_name: string } | null} role
 * @property {string[]} permissions
 * @property {string} provider
 * @property {number} is_active
 */

/**
 * @typedef {object} LoginPayload
 * @property {string} accessToken
 * @property {AuthUser} user
 * @property {string[]} permissions
 */

/** @param {string} googleToken */
export async function loginWithGoogle(googleToken) {
  const res = await apiClient.post("/api/v1/google-auth/login", {
    googleToken,
  });
  return res;
}

export async function fetchCurrentUser() {
  const res = await apiClient.get("/api/v1/google-auth/me");
  return res;
}

export async function logoutOnServer() {
  const res = await apiClient.post("/api/v1/google-auth/logout", {});
  return res;
}
