import  { useState, useEffect } from "react";
import { getAllAppointments, cancelAppointment } from "../api/appointments";

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchAppointments = () => {
    getAllAppointments()
      .then((res) => setAppointments(res.data))
      .catch(() => setError("Failed to load appointments"));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    cancelAppointment(id)
      .then(() => {
        setMessage("Appointment cancelled");
        setAppointments((prev) => prev.filter((app) => app.id !== id));
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setError("Cancel failed"));
  };

  return (
    <div>
      <h2>All Appointments</h2>
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Patient ID</th>
            <th>Doctor</th>
            <th>Date & Time</th>
            <th>Time Slot</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No appointments yet
              </td>
            </tr>
          ) : (
            appointments.map((app) => (
              <tr key={app.id}>
                <td>{app.patientName}</td>
                <td>{app.patientId}</td>
                <td>{app.doctors?.fullName || "N/A"}</td>
                <td>{new Date(app.appointmentDate).toLocaleString()}</td>
                <td>{app.timeSlot}</td>
                <td>
                  <button onClick={() => handleCancel(app.id)}>Cancel</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsList;