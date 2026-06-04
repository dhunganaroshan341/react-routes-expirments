import axios from "axios";
export function sendContactForm(data) {
  return axios.post("http://localhost:8000/api/contact", data);
}