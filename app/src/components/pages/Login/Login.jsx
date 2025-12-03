import "./Login.scss";
import logo from "../../../assets/logo-jotanunes.png";
import wave from "../../../assets/red-wave.svg";
import { BsEnvelope, BsKey, BsEye, BsEyeSlash } from "react-icons/bs";
import { useLogin } from "../../../hooks/useLogin";

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    error,
    handleSubmit,
    togglePasswordVisibility,
    isAuthenticating, // 👈 NOVO
  } = useLogin();

  return (
    <div className="login-page">
      <div className="left-side">
        <img src={wave} alt="" className="wave-bg" />
        <img src={logo} alt="Jotanunes Construtora" className="logo" />
      </div>

      <div className="right-side">
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <h2>Bem vindo ao</h2>
          <h1>Sistema de Gerenciamento</h1>

          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <span className="icon" aria-hidden="true">
              <BsEnvelope />
            </span>
            <div className="input-content">
              <label>Email</label>
              <input
                type="email"
                placeholder="exemplo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isAuthenticating}
              />
            </div>
          </div>

          <div className="input-group">
            <span className="icon" aria-hidden="true">
              <BsKey />
            </span>
            <div className="input-content">
              <label>Senha</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isAuthenticating}
              />
            </div>

            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              disabled={isAuthenticating}
            >
              <i>{showPassword ? <BsEyeSlash /> : <BsEye />}</i>
            </button>
          </div>

          <div className="form-footer">
            <label>
              <input type="checkbox" disabled={isAuthenticating} /> Lembrar-me
            </label>
            <a href="#">Esqueceu a senha?</a>
          </div>

          {/* Botão com estado de autenticação */}
          <button type="submit" disabled={isAuthenticating}>
            {isAuthenticating ? "Autenticando..." : "Login"}
          </button>

          {/* Barrinha de progresso de autenticação */}
          {isAuthenticating && (
            <div className="auth-status">
              <div className="auth-bar" />
            </div>
          )}

          <p>
            Não tem uma conta? <a href="#">Registrar</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
