import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error } from "./pages/error";
import { Game } from "./pages/game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sudoku" element={<Game />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
