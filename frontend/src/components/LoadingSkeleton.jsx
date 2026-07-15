import { Grid, Skeleton, Paper } from "@mui/material";

function LoadingSkeleton() {
  return (
    <Grid container spacing={3}>
      {[1, 2, 3, 4].map((item) => (
        <Grid key={item} size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="40%" height={60} />
            <Skeleton variant="rounded" height={100} />
          </Paper>
        </Grid>
      ))}

      <Grid size={{ xs: 12 }}>
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Skeleton variant="rounded" height={350} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoadingSkeleton;