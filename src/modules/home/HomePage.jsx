import { Typography } from "@mui/material";

export default function HomePage() {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Home
      </Typography>
      <Typography color="text.secondary" component="div">
        <p>You are signed in.</p>
        <p>
          Authenticated URLs and sidebar entries are defined in{" "}
          <code>shared/routes/routesConfig.js</code>. React Router registration
          is in <code>shared/routes/AppRoutes.jsx</code>; flat leaves and drawer
          data helpers live in <code>shared/routes/route-nav.js</code>
          . Runtime checks use <code>shared/routes/route-nav-types.js</code>. Use{" "}
          <code>hidden: true</code> on a leaf to keep the URL but skip the drawer.
          Optional <code>permissionAny</code> or <code>permissionAll</code> are
          enforced in the router and sidebar via <code>route-permission.js</code>.
        </p>
      </Typography>
    </div>
  );
}
