import { Link } from "react-router-dom";

const NewSheetButton = () => {
  return (
    <Link
      to="/new-sheet"
      target="_blank">
      <button>New Sheet</button>
    </Link>
  );
};

export default NewSheetButton;
