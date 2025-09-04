import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.scss"; // estilos da página de login
import logo from "../assets/logo-jotanunes.png"; // logo da empresa

function Login() {
  const navigate = useNavigate();

  // estados controlados para email, senha, exibição da senha e mensagens de erro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // função disparada ao enviar o formulário
  const handleSubmit = (e) => {
  e.preventDefault(); // evita reload da página
  navigate("/dashboard"); // força ir para o dashboard
};

  return (
    <div className="login-page">
      {/* lado esquerdo: logo da empresa */}
      <div className="left-side">
        <img src={logo} alt="Jotanunes Construtora" className="logo" />
      </div>

      {/* lado direito: formulário de login */}
      <div className="right-side">
        <form className="form-container" onSubmit={handleSubmit}>
          {/* título de boas-vindas */}
          <h2>Bem vindo ao</h2>
          <h1>Sistema de Gerenciamento</h1>

          {/* mensagem de erro (só aparece se existir erro) */}
          {error && <p className="error-message">{error}</p>}

          {/* campo de email */}
          <div className="input-group">
            <span className="icon">📧</span> {/* ícone de email */}
            <div className="input-content">
              <label>Email</label>
              <input
                type="email"
                placeholder="exemplo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // atualiza estado
              />
            </div>
          </div>

          {/* campo de senha */}
          <div className="input-group">
            <span className="icon">🔑</span> {/* ícone de chave */}
            <div className="input-content">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"} // alterna visibilidade
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // atualiza estado
              />
            </div>

            {/* botão para mostrar/ocultar senha */}
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"} {/*Necessita trocar o icon com boostrapicons ou até do tailwind */}
            </button>
          </div>

          {/* rodapé do formulário */}
          <div className="form-footer">
            <label>
              <input type="checkbox" /> Remember me {/* checkbox "lembrar" */}
            </label>
            <a href="#">Forgot Password?</a> {/* link de recuperação */}
          </div>

          {/* botão principal de login */}
          <button type="submit">Login</button>

          {/* link para registro */}
          <p>
            Don’t have an account? <a href="#">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
