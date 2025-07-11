import { BrowserRouter as Router } from "react-router-dom";
import GuestRoutes from "./routes/GuestRoute";

export default function App() {
  return (
    <Router>
      <GuestRoutes />
    </Router>
  );
}