# Portal_Sistema_de_Gerenciamento_Jota_Nunes_Squad03const handleSubmit = async (e) => {
    e.preventDefault(); // evita reload da página
    setError(""); // limpa erros anteriores

    try {
      // chamada à API de login
      const res = await api.post("/auth/login", { email, password });

      // salva token no localStorage para autenticação futura
      localStorage.setItem("token", res.data.token);

      // redireciona para o dashboard
      navigate("/dashboard");
    } catch (err) {
      // exibe mensagem de erro em caso de login inválido
      setError("Usuário ou senha inválidos");
    }
  };

  Axios para adicionar endpoint depois.