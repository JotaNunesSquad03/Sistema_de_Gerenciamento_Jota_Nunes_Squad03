import axios from "axios";

const api = axios.create({
  baseURL: "https://sistemas-gerenciador-customizacoes-rm-jn-3gsn.onrender.com", // depois você troca pelo endpoint real
});

export default api;
