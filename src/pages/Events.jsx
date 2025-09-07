import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/image.jpg"; // ✅ import background image

const eventTypes = ["Workshop", "Hackathon", "Tech Talk", "Cultural Fest"];
const collegeId = "1";
const itemsPerPage = 6;

function AddEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    college_id: collegeId,
    event_name: "",
    event_type: "",
    event_date: "",
  });
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("upcoming");

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (!token) {
      alert("You must login first!");
      navigate("/login");
    } else {
      fetchEvents();
    }
  }, [token, navigate]);

  const fetchEvents = async () => {
    try {
      setError("");
      const res = await axios.get(
        "https://college-event-management-0f88.onrender.com/admin/events",
        axiosConfig
      );
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError("Unauthorized! Please login as admin.");
        navigate("/login");
      } else {
        setError("Failed to fetch events.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdding(true);
    setError("");

    try {
      await axios.post(
        "https://college-event-management-0f88.onrender.com/admin/events",
        formData,
        axiosConfig
      );
      alert("Event added successfully!");
      setFormData({
        college_id: collegeId,
        event_name: "",
        event_type: "",
        event_date: "",
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError("Unauthorized! Please login as admin.");
        navigate("/login");
      } else {
        setError("Failed to add event.");
      }
    } finally {
      setAdding(false);
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.event_date);
    const dateB = new Date(b.event_date);
    return sortOrder === "upcoming" ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);
  const currentEvents = sortedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

  const isPastEvent = (date) => new Date(date) < new Date();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 🔹 Dark Blur Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* 🔹 Main Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl w-full z-10">
        {/* Add Event Form */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Add New Event</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="college_id" value={formData.college_id} />

            <div>
              <label className="text-black-500 text-sm">Event Name</label>
              <input
                type="text"
                name="event_name"
                value={formData.event_name}
                onChange={handleChange}
                placeholder="Enter event title"
                required
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-black-500 text-sm">Event Type</label>
              <select
                name="event_type"
                value={formData.event_type}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>Select type</option>
                {eventTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-black-500 text-sm">Event Date</label>
              <input
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-black-500 text-sm">College</label>
              <input
                type="text"
                value={`College ${collegeId}`}
                readOnly
                className="w-full p-3 border rounded-xl bg-gray-100 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={adding}
              className={`w-full py-3 text-white rounded-xl transition ${
                adding ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {adding ? "Adding..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Events List */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Existing Events</h2>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border rounded-xl"
            >
              <option value="upcoming">Upcoming First</option>
              <option value="latest">Latest First</option>
            </select>
          </div>

          {currentEvents.length === 0 ? (
            <p className="text-gray-600">No events added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentEvents.map((event) => (
                <div
                  key={event.event_id || event.id}
                  className={`rounded-xl p-4 border ${
                    isPastEvent(event.event_date)
                      ? "border-red-500 bg-red-100 text-red-800"
                      : "border-gray-200 bg-gray-100"
                  }`}
                >
                  <h3 className="text-lg font-bold">{event.event_name}</h3>
                  <p className="text-sm">Date: {new Date(event.event_date).toLocaleDateString("en-US")}</p>
                  <p className="text-sm">Type: {event.event_type}</p>
                  <p className="text-sm">College: College {collegeId}</p>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {events.length > itemsPerPage && (
            <div className="flex items-center justify-center mt-6 space-x-2">
              <button
                onClick={handlePrev}
                className="px-3 py-1 text-gray-500 border rounded-lg hover:bg-gray-200"
                disabled={currentPage === 1}
              >
                &lt; Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageClick(i + 1)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white font-bold"
                      : "border text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                className="px-3 py-1 text-gray-500 border rounded-lg hover:bg-gray-200"
                disabled={currentPage === totalPages}
              >
                Next &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
