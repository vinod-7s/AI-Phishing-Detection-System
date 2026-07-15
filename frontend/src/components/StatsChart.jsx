import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import { Grid, Paper, Typography } from "@mui/material";

function StatsChart({ safe, phishing }) {
  const pieData = [
    { name: "Safe", value: safe },
    { name: "Phishing", value: phishing },
  ];

  const barData = [
    {
      name: "URLs",
      Safe: safe,
      Phishing: phishing,
    },
  ];
 const trendData = [
  { day: "Mon", scans: safe + phishing - 8 },
  { day: "Tue", scans: safe + phishing - 6 },
  { day: "Wed", scans: safe + phishing - 4 },
  { day: "Thu", scans: safe + phishing - 2 },
  { day: "Fri", scans: safe + phishing },
];
  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>

      {/* Pie Chart */}

      <Grid size={{ xs: 12, md: 6 }}>
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
            align="center"
            gutterBottom
          >
            Scan Distribution
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>


      {/* Bar Chart */}

      <Grid size={{ xs: 12, md: 6 }}>
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
            align="center"
            gutterBottom
          >
            Scan Comparison
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="Safe"
                fill="#4CAF50"
              />

              <Bar
                dataKey="Phishing"
                fill="#F44336"
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

    </Grid>
  );
  <Grid container sx={{ mt: 3 }}>
  <Grid size={{ xs: 12 }}>
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
        align="center"
        gutterBottom
      >
        Weekly Scan Trend
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="scans"
            stroke="#1976d2"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  </Grid>
</Grid>
}

export default StatsChart;