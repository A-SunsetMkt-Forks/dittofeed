import { AddCircleOutline } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";

export function ResourceList({
  children,
  title,
  newItemHref,
}: {
  children: React.ReactNode;
  newItemHref: string;
  title: string;
}) {
  return (
    <Stack
      sx={{
        padding: 1,
        width: "100%",
        maxWidth: "40rem",
      }}
      spacing={2}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ padding: 1 }} variant="h5">
          {title}
        </Typography>
        <IconButton LinkComponent={Link} href={newItemHref}>
          <AddCircleOutline />
        </IconButton>
      </Stack>
      {children}
    </Stack>
  );
}