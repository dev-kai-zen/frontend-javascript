import HomeIcon from "@mui/icons-material/Home";

import HomePage from "../../modules/home/HomePage";

/**
 * Declarative nav + URL tree: paths, labels, icons, grouping, flags.
 *
 * How to extend
 * -------------
 * 1. **Leaf route** — one URL and one page component:
 *    `{ kind: "leaf", key: "unique-id", path: "/path", Page: MyPage, label: "Label", Icon: MyIcon }`
 * 2. **Group** — sidebar folder with nested `children` (no URL of its own):
 *    `{ kind: "group", key: "section", label: "Section", Icon: SectionIcon, children: [ …leaves or nested groups ] }`
 * 3. **Hidden** — register the route but hide from the drawer: `hidden: true` on a leaf or group.
 * 4. **Permissions** (optional, same shape as backend permission codes):
 *    - `permission: "code"` — single required code (enforced in TS via typings; runtime checks `permissionAll` / `permissionAny` in `route-permission.js`)
 *    - `permissionAny: ["a","b"]` — user needs one of these
 *    - `permissionAll: ["a","b"]` — user needs all of these
 *
 * `<AppRoutes />` turns every **leaf** into a `<Route />`. `route-nav.js` derives the sidebar
 * from the same tree (`ROUTES_SIDEBAR_TREE` drops `hidden` entries only; permissions filter at runtime).
 */
export const ROUTES_NAV_TREE = [
  {
    kind: "leaf",
    key: "home",
    path: "/home",
    Page: HomePage,
    label: "Home",
    Icon: HomeIcon,
  },

  /* Example — uncomment when you add `SettingsPage`:
  {
    kind: "leaf",
    key: "settings",
    path: "/settings",
    Page: SettingsPage,
    label: "Settings",
    Icon: SettingsIcon,
  },
  {
    kind: "group",
    key: "administration",
    label: "Administration",
    Icon: AdminPanelSettingsIcon,
    children: [
      {
        kind: "leaf",
        key: "user-management",
        path: "/user-management",
        Page: UserManagementPage,
        label: "User management",
        Icon: PersonIcon,
        permissionAny: ["users.read"],
      },
    ],
  },
  */
];
