import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../../modules/auth/LoginPage";
import { useAuthStore } from "../../modules/auth/auth-store";
import NotFoundPage from "../pages/NotFoundPage";
import RestrictedPage from "../pages/RestrictedPage";
import MainLayout from "../shell/MainLayout";
import RequireAuth from "./RequireAuth";
import { viewerMayAccessNavItem } from "./route-permission";
import { isRouteNavGroup } from "./route-nav-types";
import { ROUTES_NAV_TREE } from "./routesConfig";

/** Stable fallback for Zustand selectors — `?? []` would allocate a new array every snapshot and break `useSyncExternalStore`. */
const NO_PERMISSIONS = [];

function collectLayoutLeavesFromTree(items, accumulated) {
  for (const item of items) {
    if (isRouteNavGroup(item)) {
      collectLayoutLeavesFromTree(item.children, accumulated);
    } else {
      accumulated.push(item);
    }
  }
}

function navTreeToLayoutRouteLeaves(items) {
  const leaves = [];
  collectLayoutLeavesFromTree(items, leaves);
  return leaves;
}

const layoutRouteLeaves = navTreeToLayoutRouteLeaves(ROUTES_NAV_TREE);

function canViewerOpenLeaf(permissionCodes, roleName, leaf) {
  return viewerMayAccessNavItem(permissionCodes, roleName, leaf);
}

function RouteLeafOutlet({ leaf }) {
  const permissionCodes = useAuthStore((s) => s.user?.permissions ?? NO_PERMISSIONS);
  const roleName = useAuthStore((s) => s.user?.role?.role_name ?? null);

  if (!canViewerOpenLeaf(permissionCodes, roleName, leaf)) {
    return <RestrictedPage />;
  }

  const Page = leaf.Page;
  return <Page />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          {layoutRouteLeaves.map((leaf) => (
            <Route
              key={leaf.key}
              path={leaf.path}
              element={<RouteLeafOutlet leaf={leaf} />}
            />
          ))}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
