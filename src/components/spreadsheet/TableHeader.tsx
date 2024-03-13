import { observer } from "mobx-react";
import spreadsheetStore from "../../state/SheetStore";
import styles from "./TableHeader.module.css";
//components
import TypeDropdown from "./TypeDropdown";

const TableHeader = observer(() => {
  const { spreadsheetData, columnTypes } = spreadsheetStore;
  const numColumns = spreadsheetData[0] ? spreadsheetData[0].length : 0;

  return (
    <thead className={styles.tableHeader}>
      <tr key="header_row">
        {/* empty cell for top left corner */}
        <th className={styles.cornerCell}></th>
        {/* type row */}
        {columnTypes.map((_, index) => (
          <TypeDropdown
            key={`type_dropdown_${index}`}
            index={index}
          />
        ))}
      </tr>
      <tr key="x_axis_row">
        {/* empty cell for second top left corner */}
        <th className={styles.cornerCell}></th>
        {/* column headers */}
        {[...Array(numColumns)].map((_, index) => (
          <th
            key={`column_header_${index}`}
            className={styles.columnHeader}>
            {index + 1}
          </th>
        ))}
      </tr>
    </thead>
  );
});

export default TableHeader;
