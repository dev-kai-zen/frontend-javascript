import { create } from "zustand";

import { fetchCurrentUser } from "./authApi";
import { authTokenRef } from "../../shared/api/api-client";
import { postRefresh } from "./refresh-api";

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  isReady: false,

  setSession: (accessToken, user) => {
    authTokenRef.current = accessToken;
    set({ accessToken, user });
  },

  setAccessToken: (accessToken) => {
    authTokenRef.current = accessToken;
    set({ accessToken });
  },

  clearSession: () => {
    authTokenRef.current = null;
    set({ accessToken: null, user: null });
  },

  bootstrap: async () => {
    if (get().accessToken && get().user) {
      set({ isReady: true });
      return;
    }

    try {
      const refreshed = await postRefresh();
      if (refreshed.success && refreshed.data?.accessToken) {
        authTokenRef.current = refreshed.data.accessToken;
        set({ accessToken: refreshed.data.accessToken });
        const me = await fetchCurrentUser();
        if (me.success && me.data?.user) {
          set({ user: me.data.user, isReady: true });
          return;
        }
      }
    } catch {
      /* No valid refresh cookie — stay logged out unless login finished in parallel. */
    }

    if (get().accessToken && get().user) {
      set({ isReady: true });
      return;
    }

    authTokenRef.current = null;
    set({ accessToken: null, user: null, isReady: true });
  },
}));
