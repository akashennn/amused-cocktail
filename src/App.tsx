import "antd/dist/reset.css";
import { Route, Routes, useLocation } from "react-router-dom";
import FavoritesPage from "./routes/favorites";
import IndexPage from "./routes/index";
import Layout from "./routes/layout";

export default function App() {
  // capture current location for navigation
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Layout pathname={location.pathname} />}>
        <Route index element={<IndexPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}
