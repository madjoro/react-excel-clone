import { observer } from "mobx-react";
import spreadsheetStore, { Cell as CellType } from "../../state/SheetStore";
import { useEffect } from "react";
//components
import Row from "./Row";
import TableHeader from "./TableHeader";
import Toolbar from "../toolbar/Toolbar";
//style
import styles from "./Spreadsheet.module.css";

type RowData = CellType[];

const Spreadsheet = observer(() => {
  //generates and sets blank spreadsheet on first render
  useEffect(() => {
    spreadsheetStore.generateBlankSpreadsheet(5, 5);
  }, []);

  const { spreadsheetData } = spreadsheetStore;

  return (
    <>
      <Toolbar />
      <table className={styles.TableContainer}>
        <TableHeader />
        <tbody>
          {spreadsheetData.map((row: RowData, rowIndex: number) => (
            <Row
              key={`key_${rowIndex}`}
              rowIndex={rowIndex}
              rowData={row}
            />
          ))}
        </tbody>
      </table>
    </>
  );
});

export default Spreadsheet;
