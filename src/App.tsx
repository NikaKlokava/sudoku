import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Game } from "./pages/game";
import { Home } from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sudoku" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
