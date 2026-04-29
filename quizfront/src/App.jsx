import "react";
import DoctorsPage from "./page/DoctorsPage";
import AppointmentPage from "./page/AppointmentPage";
import AppointmentsList from "./page/AppointmentsList";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Doctor Appointment System</h1>
      <DoctorsPage />
      <hr />
      <AppointmentPage />
      <hr />
      <AppointmentsList />
    </div>
  );
}

export default App;