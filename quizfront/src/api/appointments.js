import axios from "axios";

const BASE_URL = "http://localhost:8080/api/appointments";

export function getAllAppointments() {
  return axios.get(BASE_URL);
}

export function bookAppointment(data) {
  return axios.post(BASE_URL, data, {
    headers: { "Content-Type": "application/json" },
  });
}

export function cancelAppointment(id) {
  return axios.delete(`${BASE_URL}/${id}`);
}