import { observer } from "mobx-react";
import spreadsheetStore, { Cell as CellType } from "../../state/SheetStore";
import styles from "./Cell.module.css";

interface CellProps {
  cell: CellType;
}

const Cell: React.FC<CellProps> = observer(({ cell }) => {
  // type and header are deconstructed here so the cells react to changes
  const { col, row, value, type, header } = cell;
  let correctType = spreadsheetStore.checkType(cell);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const columnType = spreadsheetStore.columnTypes[cell.col];

    const isValidType = typeof newValue === columnType;
    correctType = isValidType;

    spreadsheetStore.updateCell(cell, newValue);
  };

  // evaluate formula on Enter keypress
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (cell.value.toString().startsWith("=")) {
        const newValue = spreadsheetStore.evaluateFormula(cell);
        if (newValue) {
          spreadsheetStore.updateCell(cell, newValue);
        }
      }
      e.preventDefault();
    }
  };

  const borderClass = correctType ? styles.CellInput : styles.CellInputError;

  return (
    <td className={styles.CellTd}>
      <input
        className={borderClass}
        id={`${row}_${col}`}
        type="text"
        value={String(value)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </td>
  );
});

export default Cell;
