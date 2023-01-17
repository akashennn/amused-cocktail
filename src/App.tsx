import { Route, Routes } from "react-router-dom";
import IndexPage from "./routes/index";
import FavoritesPage from "./routes/favorites";

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<IndexPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}
