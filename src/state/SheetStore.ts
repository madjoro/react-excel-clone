import { makeObservable, observable, action } from "mobx";

// only primitives except symbol & undef
// since we're dealing with CSV files and user input, null is not really an option
type Primitive = string | number | boolean | bigint; //| null;

export interface Cell {
  header: boolean;
  value: Primitive;
  type: string;
  row: number;
  col: number;
}

const BLANK_CELL: Cell = {
  header: false,
  value: "",
  type: "string",
  row: -1,
  col: -1,
};

class SpreadsheetStore {
  spreadsheetData: Cell[][] = [];
  hasHeader: boolean = false;
  columnTypes: string[] = [];

  constructor() {
    makeObservable(this, {
      //observables
      spreadsheetData: observable,
      hasHeader: observable,
      columnTypes: observable,
      //actions
      updateCell: action,
      checkType: action,
      setSpreadsheetData: action,
      setHasHeader: action,
      generateBlankSpreadsheet: action,
      addRow: action,
      addColumn: action,
      updateColumnType: action,
    });
  }

  checkType(cell: Cell): boolean {
    // headers and empty strings are always allowed
    if (cell.header || cell.value === "" || cell.type === "string") {
      return true;
    }

    switch (cell.type) {
      case "boolean":
        return cell.value === "true" || cell.value === "false";
      case "number":
        return !isNaN(Number(cell.value));
      case "bigint":
        try {
          const bigIntValue = BigInt(cell.value);
          return bigIntValue.toString() === (cell.value as string).trim();
        } catch (error) {
          return false;
        }
      case "null":
        // empty string as null for this case
        return cell.value === null || cell.value === "";
      default:
        return false;
    }
  }

  updateCell(cell: Cell, value: Primitive) {
    this.spreadsheetData[cell.row][cell.col].value = value;
  }

  evaluateFormula(cell: Cell): Primitive {
    const formula = cell.value.toString().substring(1);

    // check for "=" as the beginning of a formula
    if (cell.value.toString().startsWith("=")) {
      switch (true) {
        case formula.startsWith("UPPER(") && formula.endsWith(")"): {
          const upperArg = formula.substring(
            "UPPER(".length,
            formula.length - 1
          );
          return upperArg.toUpperCase();
        }
        case formula.startsWith("LOWER(") && formula.endsWith(")"): {
          const lowerArg = formula.substring(
            "LOWER(".length,
            formula.length - 1
          );
          return lowerArg.toLowerCase();
        }
        case formula.startsWith("LENGTH(") && formula.endsWith(")"): {
          const lengthArg = formula.substring(
            "LENGTH(".length,
            formula.length - 1
          );
          return lengthArg.length;
        }
        case formula.startsWith("MAX(") && formula.endsWith(")"): {
          const maxArgs = formula
            .substring("MAX(".length, formula.length - 1)
            .split(",")
            .map((arg) => parseFloat(arg.trim()));
          if (maxArgs.length === 0 || maxArgs.some(isNaN)) return NaN;
          return Math.max(...maxArgs);
        }
        case formula.startsWith("MIN(") && formula.endsWith(")"): {
          const minArgs = formula
            .substring("MIN(".length, formula.length - 1)
            .split(",")
            .map((arg) => parseFloat(arg.trim()));
          if (minArgs.length === 0 || minArgs.some(isNaN)) return NaN;
          return Math.min(...minArgs);
        }
        default:
          // handle bad formulas
          return "Unsupported Formula";
      }
    }

    return cell.value;
  }

  updateColumnType(column: number, type: string) {
    this.columnTypes[column] = type;

    // update type property of all cells in corresponding column
    this.spreadsheetData.forEach((row) => {
      row[column].type = type;
    });
  }

  addColumn() {
    const numCols = this.spreadsheetData[0].length;
    const numRows = this.spreadsheetData.length;

    for (let i = 0; i < numRows; i++) {
      const row = this.spreadsheetData[i];
      if (i === 0 && this.hasHeader) {
        row.push({ ...BLANK_CELL, row: i, col: numCols, header: true });
      } else {
        row.push({ ...BLANK_CELL, row: i, col: numCols });
      }
    }

    if (numCols > 0) {
      this.columnTypes.push("string");
    }
  }

  addRow() {
    const numCols = this.spreadsheetData[0].length;
    const newRow: Cell[] = Array.from({ length: numCols }).map(
      (_, colIndex) => ({
        ...BLANK_CELL,
        row: this.spreadsheetData.length,
        col: colIndex,
      })
    );
    this.spreadsheetData.push(newRow);
  }

  // generates and sets a n*n spreadsheet
  generateBlankSpreadsheet(numRows: number, numCols: number) {
    const blankSpreadsheet: string[][] = [];

    for (let i = 0; i < numRows; i++) {
      const row: string[] = [];

      for (let j = 0; j < numCols; j++) {
        row.push("");
      }
      blankSpreadsheet.push(row);
    }
    this.setSpreadsheetData(blankSpreadsheet, false);
  }

  setHasHeader(hasHeader: boolean) {
    this.hasHeader = hasHeader;

    const firstRow = this.spreadsheetData[0];

    firstRow.forEach((cell) => {
      cell.header = hasHeader;
    });
  }

  setSpreadsheetData(data: string[][], header: boolean) {
    const numColumns = data[0] ? (data[0] as string[]).length : 0;
    this.columnTypes = Array.from({ length: numColumns }, () => "string");

    this.spreadsheetData = data.map((row, rowIndex) =>
      (row as string[]).map((cellValue, colIndex) => ({
        header: header && rowIndex === 0,
        value: cellValue,
        type: "string",
        row: rowIndex,
        col: colIndex,
      }))
    );
    this.setHasHeader(header);
  }
}

export default new SpreadsheetStore();
