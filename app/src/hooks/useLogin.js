import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const useLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    error,
    setError,
    handleSubmit,
    togglePasswordVisibility,
  };
};
