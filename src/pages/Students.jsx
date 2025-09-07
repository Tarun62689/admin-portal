// src/pages/Students.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Editing state
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    student_name: "",
    usn: "",
    department: "",
    year: "",
    phone: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("You must login first!");
      navigate("/login");
      return;
    }
    fetchStudents();
  }, [token, navigate]);

  const fetchStudents = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await axios.get(
        "https://college-event-management-0f88.onrender.com/admin/students",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError("Unauthorized! Please login as admin.");
        navigate("/login");
      } else {
        setError("Failed to fetch student data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student.student_id);
    setFormData({
      student_name: student.student_name || "",
      usn: student.usn || "",
      department: student.department || "",
      year: student.year || "",
      phone: student.phone || "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://college-event-management-0f88.onrender.com/admin/students/${editingStudent}`,
        formData, // only editable fields
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Student updated successfully!");
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to update student.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
        🎓 Students Management
      </h2>

      {loading && (
        <p className="text-gray-600 bg-white p-4 rounded shadow">Loading students...</p>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 shadow">
          {error}
        </div>
      )}

      {!loading && students.length === 0 && (
        <p className="text-gray-600">No students found.</p>
      )}

      {!loading && students.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">USN</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Year</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr
                  key={student.student_id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="px-4 py-3">{student.student_id}</td>
                  <td className="px-4 py-3 font-semibold">{student.student_name}</td>
                  <td className="px-4 py-3">{student.usn}</td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      {student.department}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-700">
                      {student.year}
                    </span>
                  </td>
                  <td className="px-4 py-3">{student.phone}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleEdit(student)}
                      className="bg-blue-600 text-white px-4 py-1 rounded-full shadow hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Form */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Edit Student
            </h3>
            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">USN</label>
                <input
                  type="text"
                  name="usn"
                  value={formData.usn}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Year</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-2 flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
