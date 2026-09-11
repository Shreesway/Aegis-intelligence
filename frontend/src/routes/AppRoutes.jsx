import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import Analysis from "../pages/Analysis";
import Compare from "../pages/Compare";
import Reports from "../pages/Reports";
import History from "../pages/History";
import Settings from "../pages/Settings";
import Chat from "../pages/Chat";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          element={<Layout />}
        >

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/upload"
            element={<Upload />}
          />

          <Route
            path="/analysis"
            element={<Analysis />}
          />

          <Route
            path="/compare"
            element={<Compare />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/chat"
            element={<Chat />}
          />

        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>

  );
}