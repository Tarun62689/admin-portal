import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Dashboard() {
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date());
  const [eventDates, setEventDates] = useState([]);

  const token = localStorage.getItem("token"); // Admin token

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("You must login as admin to view the dashboard.");
        setLoading(false);
        return;
      }

      try {
        // Fetch events
        const eventsRes = await axios.get(
          "https://college-event-management-0f88.onrender.com/admin/events",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const events = eventsRes.data || [];
        setTotalEvents(events.length);
        // Extract event dates in YYYY-MM-DD format
        setEventDates(events.map(e => e.date));

        // Fetch students
        const studentsRes = await axios.get(
          "https://college-event-management-0f88.onrender.com/admin/students",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTotalStudents(studentsRes.data.length || 0);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data. Make sure your token is valid.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Helper to highlight event dates
  const tileClassName = ({ date: tileDate, view }) => {
    if (view === "month") {
      const dateStr = tileDate.toISOString().split("T")[0];
      if (eventDates.includes(dateStr)) {
        return "bg-blue-200 text-blue-800 font-semibold rounded-full";
      }
      if (dateStr === new Date().toISOString().split("T")[0]) {
        return "border border-blue-500 rounded-full font-semibold";
      }
    }
    return null;
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

      {loading && <p>Loading dashboard data...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Events Card */}
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition">
            <p className="text-gray-500 mb-2">Total Events</p>
            <h2 className="text-4xl font-bold">{totalEvents}</h2>
          </div>

          {/* Total Students Card */}
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition">
            <p className="text-gray-500 mb-2">Total Students Registered</p>
            <h2 className="text-4xl font-bold">{totalStudents}</h2>
          </div>

          {/* Compact Calendar Card */}
          <div className="bg-white shadow-lg rounded-2xl p-4 text-center hover:shadow-2xl transition">
            <p className="text-gray-500 mb-2 font-semibold">📅 Upcoming Events</p>
            <div className="mx-auto w-[220px]">
              <Calendar
                onChange={setDate}
                value={date}
                prev2Label={null}
                next2Label={null}
                tileClassName={tileClassName}
                className="react-calendar shadow-md rounded-xl text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
