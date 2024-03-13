import { Provider } from "mobx-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spreadsheet from "./components/spreadsheet/Spreadsheet";
import spreadsheetStore from "./state/SheetStore";

const App: React.FC = () => {
  return (
    <Provider spreadsheetStore={spreadsheetStore}>
      <Router>
        <Routes>
          <Route
            path="/"
            Component={Spreadsheet}
          />
          <Route
            path="/new-sheet" //unique ID should be used for e.g. sharing
            Component={Spreadsheet}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
