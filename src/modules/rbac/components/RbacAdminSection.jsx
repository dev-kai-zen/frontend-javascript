import { Paper } from "@mui/material";

/** Bordered content panel — aligns RBAC pages with the rbac-design Paper shell. */
export function RbacAdminSection({ children, elevation = 0, sx, ...rest }) {
  return (
    <Paper
      elevation={elevation}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
}
