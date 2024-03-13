import spreadsheetStore from "../../state/SheetStore";
import { observer } from "mobx-react";

const SetHeader = observer(() => {
  const handleClick = () => {
    spreadsheetStore.setHasHeader(!spreadsheetStore.hasHeader);
  };

  return (
    <button onClick={handleClick}>
      {spreadsheetStore.hasHeader ? "Unset Header" : "Set Header"}
    </button>
  );
});

export default SetHeader;
