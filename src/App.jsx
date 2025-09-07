import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Reports from "./pages/Reports";
import Students from "./pages/Students";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Register";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="p-4 overflow-y-auto flex-1">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events" element={<Events />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/students" element={<Students />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
