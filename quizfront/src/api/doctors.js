import axios from "axios";

const BASE_URL = "http://localhost:8080/api/doctors";

export function getAllDoctors() {
  return axios.get(BASE_URL);
}

export function getDoctorById(id) {
  return axios.get(`${BASE_URL}/${id}`);
}

export function createDoctor(data) {
  return axios.post(BASE_URL, data, {
    headers: { "Content-Type": "application/json" },
  });
}

export function updateDoctor(id, data) {
  return axios.put(`${BASE_URL}/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
}