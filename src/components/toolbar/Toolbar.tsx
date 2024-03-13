import AddRowButton from "./AddRowButton";
import AddColButton from "./AddColButton";
import SetHeader from "./SetHeader";
import ImportButton from "./ImportButton";
import ExportButton from "./ExportButton";
import NewSheetButton from "./NewSheetButton";

const Toolbar = () => {
  return (
    <div className="toolbarContainer">
      <ImportButton />
      <ExportButton />
      <NewSheetButton />
      <AddRowButton />
      <AddColButton />
      <SetHeader />
    </div>
  );
};

export default Toolbar;
