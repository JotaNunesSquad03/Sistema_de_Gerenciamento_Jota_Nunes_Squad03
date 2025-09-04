import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // depois você troca pelo endpoint real
});

export default api;
