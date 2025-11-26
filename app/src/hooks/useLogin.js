import { useState } from "react";
import axios from "axios";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: email,
        senha: password, // Mesmo nome esperado pela API
      });

      // Salvar token
      localStorage.setItem("token", response.data.access_token);

      // Redirecionar
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Email ou senha incorretos.");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    error,
    handleSubmit,
  };
}
