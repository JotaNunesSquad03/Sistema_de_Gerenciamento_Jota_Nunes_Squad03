import { useState } from "react";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticating) return; // impede clique duplo

    setError("");

    // 🔐 MOCK DE CREDENCIAIS
    const MOCK_EMAIL = "admin@jotanunes.com";
    const MOCK_PASS = "123456";

    if (email === MOCK_EMAIL && password === MOCK_PASS) {
      // começa animação de autenticação
      setIsAuthenticating(true);

      // simula tempo de autenticação (1.8s)
      setTimeout(() => {
        localStorage.setItem("token", "TOKEN_MOCKADO_12345");
        window.location.href = "/dashboard";
      }, 1800);
    } else {
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
    isAuthenticating, // 👈 novo estado exposto
  };
}
