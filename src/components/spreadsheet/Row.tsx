import { observer } from "mobx-react";
import { Cell as CellType } from "../../state/SheetStore";
import Cell from "./Cell";

interface RowProps {
  rowIndex: number;
  rowData: CellType[];
}

const Row: React.FC<RowProps> = observer(({ rowIndex, rowData }) => {
  return (
    <tr>
      <td style={{ backgroundColor: "#424040" }}>{rowIndex + 1}</td>
      {rowData.map((cell, colIndex) => (
        <Cell
          key={colIndex}
          cell={cell}
        />
      ))}
    </tr>
  );
});

export default Row;
