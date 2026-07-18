function DownloadReport() {

  const handleClick = () => {
    alert("Button Clicked Successfully");
    console.log("Download button clicked");
  };

  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        textAlign: "center",
      }}
    >
      <button
        onClick={handleClick}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor: "#2E7D32",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        📄 Download Full Report
      </button>
    </div>
  );
}

export default DownloadReport;