import "antd/dist/reset.css";
import { Route, Routes } from "react-router-dom";
import FavoritesPage from "./routes/favorites";
import IndexPage from "./routes/index";

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
