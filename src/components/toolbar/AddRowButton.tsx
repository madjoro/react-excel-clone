import spreadsheetStore from "../../state/SheetStore";

const AddRowButton = () => {
  const handleClick = () => {
    spreadsheetStore.addRow();
  };

  return <button onClick={handleClick}>Add Row</button>;
};

export default AddRowButton;
