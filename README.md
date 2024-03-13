# react-excel

A simple Excel-like spreadsheet app. Users can import/export CSV files, check column types, add columns and rows, set header row and use certain formulas.

Formulas: UPPER(), LOWER(), MAX(), MIN(), LENGTH().

This was part of an assignment that had the following requirements:

1. User can create or open one spreadsheet per page or tab
2. The content of the spreadsheet can come from a CSV
3. The spreadsheet can be exported to a CSV
4. The spreadsheet has to be strict about the column types, e.g. it can only allow one type per column.
   Types can be any valid Javascript primitive type aside from Symbol and undefined
5. Formulas are optional. If provided, should be only builtin Javascript methods.
6. The app has to have a mobile friendly version.

Required:
React + Typescript
React Router
State management (Mobx)
CSV parser (papaparse)
