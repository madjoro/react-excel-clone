import spreadsheetStore from "../../state/SheetStore";
import Papa from "papaparse";

const ExportButton = () => {
  const downloadCSV = () => {
    try {
      const exportData = spreadsheetStore.spreadsheetData.map((row) =>
        row.map((cell) => cell.value)
      );

      const csv = Papa.unparse(exportData);
      const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8" });

      const csvUrl = URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.href = csvUrl;
      link.setAttribute("download", "export.csv");
      document.body.appendChild(link);
      link.click();

      // cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(csvUrl);
    } catch (error) {
      console.error("Error exporting to CSV:", error);
      // implement error handling...
    }
  };
  return <button onClick={downloadCSV}>Export CSV</button>;
};

export default ExportButton;
