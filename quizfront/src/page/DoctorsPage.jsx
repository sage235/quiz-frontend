import  { useState, useEffect } from "react";
import { getAllDoctors, createDoctor, updateDoctor } from "../api/doctors";

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    specialization: "",
    department: "",
    available: true,
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchDoctors = () => {
    getAllDoctors()
      .then((res) => setDoctors(res.data))
      .catch(() => setError("Failed to load doctors"));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editId ? updateDoctor(editId, form) : createDoctor(form);
    action
      .then(() => {
        setMessage(editId ? "Doctor updated!" : "Doctor added!");
        setForm({
          fullName: "",
          specialization: "",
          department: "",
          available: true,
        });
        setEditId(null);
        fetchDoctors();
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setError(editId ? "Update failed" : "Add failed"));
  };

  const startEdit = (doc) => {
    setEditId(doc.id);
    setForm({
      fullName: doc.fullName,
      specialization: doc.specialization,
      department: doc.department,
      available: doc.available,
    });
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Doctors</h2>
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Specialization</th>
            <th>Department</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.fullName}</td>
              <td>{doc.specialization}</td>
              <td>{doc.department}</td>
              <td>{doc.available ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => startEdit(doc)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>{editId ? "Edit Doctor" : "Add New Doctor"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
        />
        <br />
        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />
        <br />
        <label>
          Available:
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">{editId ? "Update" : "Add"}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({
                fullName: "",
                specialization: "",
                department: "",
                available: true,
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default DoctorsPage;