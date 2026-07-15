import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import jsPDF from "jspdf";

function DownloadReport({ result }) {
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "AI Powered Phishing Detection",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      `Website : ${result.url}`,
      20,
      40
    );

    doc.text(
      `Prediction : ${result.prediction}`,
      20,
      55
    );

    doc.text(
      `Confidence : ${(
        result.confidence * 100
      ).toFixed(2)}%`,
      20,
      70
    );

    doc.text(
      `Risk Level : ${
        result.prediction === "Safe"
          ? "LOW"
          : "HIGH"
      }`,
      20,
      85
    );

    doc.text(
      `Generated : ${new Date().toLocaleString()}`,
      20,
      100
    );

    doc.text(
      "Recommendation:",
      20,
      120
    );

    const recommendation =
      result.prediction === "Safe"
        ? "Website appears legitimate."
        : "Avoid visiting this website.";

    doc.text(
      recommendation,
      20,
      135
    );

    doc.save("Security_Report.pdf");
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<DownloadIcon />}
      onClick={downloadPDF}
      sx={{ mt: 3 }}
    >
      Download AI Report
    </Button>
  );
}

export default DownloadReport;