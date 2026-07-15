import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion.create(Card);

function DashboardCard({
  title,
  value,
  color,
  icon,
  delay = 0,
}) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -12, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      elevation={6}
      sx={{
        borderRadius: 4,
        background: `linear-gradient(135deg, ${color || '#1565C0'}, ${color ? color + '80' : '#42A5F5'})`,
        color: "white",
        cursor: "pointer",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.1)",
          transition: "left 0.5s",
        },
        "&:hover::before": {
          left: "100%",
        },
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            opacity: 0.85,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>

        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ mt: 2, mb: 1 }}
          >
            {value}
          </Typography>
        </motion.div>

        {icon && (
          <Box sx={{ mt: 2, fontSize: 32 }}>
            {icon}
          </Box>
        )}
      </CardContent>
    </MotionCard>
  );
}

export default DashboardCard;