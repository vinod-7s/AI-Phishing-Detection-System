import {
  PieChart,
  LineChart,
} from "@mui/x-charts";

import { Grid, Paper, Typography } from "@mui/material";

function AnalyticsChart({ history }) {
  const safe = history.filter(
    (i) => i.prediction === "Safe"
  ).length;

  const phishing = history.filter(
    (i) => i.prediction === "Phishing"
  ).length;

  const dailyMap = {};

  history.forEach((item) => {
    const day = new Date(
      item.created_at
    ).toLocaleDateString();

    dailyMap[day] =
      (dailyMap[day] || 0) + 1;
  });

  const dates = Object.keys(dailyMap);

  const scans = Object.values(dailyMap);

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>

      <Grid item xs={12} md={6}>

        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
          >
            Safe vs Phishing
          </Typography>

          <PieChart
            height={300}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: safe,
                    label: "Safe",
                  },
                  {
                    id: 1,
                    value: phishing,
                    label: "Phishing",
                  },
                ],
              },
            ]}
          />
        </Paper>

      </Grid>

      <Grid item xs={12} md={6}>

        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
          >
            Daily Scan Trend
          </Typography>

          <LineChart
            height={300}
            xAxis={[
              {
                scaleType: "point",
                data: dates,
              },
            ]}
            series={[
              {
                data: scans,
                label: "Scans",
              },
            ]}
          />
        </Paper>

      </Grid>

    </Grid>
  );
}

export default AnalyticsChart;