import Papa from "papaparse";
import spreadsheetStore from "../../state/SheetStore";
import { useRef } from "react";

const ImportButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      Papa.parse(file, {
        header: false, //changed to false to get [[]]
        skipEmptyLines: true,
        dynamicTyping: false, //could be set to true and handled later
        complete: (result) => {
          if (result.data) {
            const data: string[][] = result.data as string[][];
            // could implement a function to determine if first row is a header
            //...
            spreadsheetStore?.setSpreadsheetData(data, false);
          }
        },
      });
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".csv"
        onChange={handleImport}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <input
        type="button"
        value="Import CSV"
        onClick={handleClick}
      />
    </>
  );
};

export default ImportButton;
