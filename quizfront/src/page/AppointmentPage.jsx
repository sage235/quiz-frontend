import  { useState, useEffect } from "react";
import { getAllDoctors } from "../api/doctors";
import { bookAppointment } from "../api/appointments";

function AppointmentPage() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patientName: "",
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    timeSlot: "08:00-09:00",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAllDoctors()
      .then((res) => setDoctors(res.data))
      .catch(() => setError("Could not load doctors list"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentData = {
      patientName: form.patientName,
      patientId: parseInt(form.patientId),
      appointmentDate: form.appointmentDate,
      timeSlot: form.timeSlot,
      doctors: { id: parseInt(form.doctorId) },
    };
    bookAppointment(appointmentData)
      .then(() => {
        setMessage("Appointment booked successfully!");
        setForm({
          patientName: "",
          patientId: "",
          doctorId: "",
          appointmentDate: "",
          timeSlot: "08:00-09:00",
        });
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setError("Booking failed. Check doctor and date."));
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Book an Appointment</h2>
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="patientName"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="patientId"
          type="number"
          placeholder="Patient ID"
          value={form.patientId}
          onChange={handleChange}
          required
        />
        <br />
        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.fullName} - {doc.specialization}
            </option>
          ))}
        </select>
        <br />
        <input
          name="appointmentDate"
          type="datetime-local"
          value={form.appointmentDate}
          onChange={handleChange}
          required
        />
        <br />
        <select name="timeSlot" value={form.timeSlot} onChange={handleChange}>
          <option value="08:00-09:00">08:00-09:00</option>
          <option value="10:00-11:00">10:00-11:00</option>
          <option value="14:00-15:00">14:00-15:00</option>
        </select>
        <br />
        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default AppointmentPage;