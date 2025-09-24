import "./Login.scss";
import logo from "../../../assets/logo-jotanunes.png";
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
  } = useLogin();

  return (
    <div className="login-page">
      <div className="left-side">
        <img src={logo} alt="Jotanunes Construtora" className="logo" />
      </div>

      <div className="right-side">
        <form className="form-container" onSubmit={handleSubmit}>
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
              />
            </div>
          </div>

          <div className="input-group">
            <span className="icon" aria-hidden="true">
              <BsKey />
            </span>
            <div className="input-content">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              <i>{showPassword ? <BsEyeSlash /> : <BsEye />}</i>
            </button>
          </div>

          <div className="form-footer">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Login</button>

          <p>
            Don't have an account? <a href="#">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
