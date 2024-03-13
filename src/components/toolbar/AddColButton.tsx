import spreadsheetStore from "../../state/SheetStore";

const AddColButton = () => {
  const handleClick = () => {
    spreadsheetStore.addColumn();
  };

  return <button onClick={handleClick}>Add Column</button>;
};

export default AddColButton;
