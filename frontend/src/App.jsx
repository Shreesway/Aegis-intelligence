import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/AppContext"; // <-- Make sure this path is correct!

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}