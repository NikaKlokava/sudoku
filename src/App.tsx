import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Game } from "./pages/game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sudoku" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
