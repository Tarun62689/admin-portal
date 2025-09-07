import { FaHome, FaCalendarAlt, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-6">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          <svg
            className="w-8 h-8 text-white" 
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.47L18.66 8.01L12 11.55L5.34 8.01L12 4.47ZM4 9.47L11 13.11V20.3L4 16.5V9.47ZM13 20.3V13.11L20 9.47V16.5L13 20.3Z" />
          </svg>
          <span className="text-xl font-semibold text-white">
            CAMPUS CONNECT
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        <Link to="/dashboard" className="flex items-center gap-2 hover:text-blue-300">
          <FaHome /> Dashboard
        </Link>
        <Link to="/events" className="flex items-center gap-2 hover:text-blue-300">
          <FaCalendarAlt /> Events
        </Link>
        <Link to="/students" className="flex items-center gap-2 hover:text-blue-300">
          <FaUsers /> Students
        </Link>
        <Link to="/reports" className="flex items-center gap-2 hover:text-blue-300">
          <FaChartBar /> Reports
        </Link>
      </nav>
    </div>
  );
}
