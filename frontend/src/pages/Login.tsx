import { useState } from "react";
import Button from "../components/Button";
import api from "../lib/api";

export default function Login() {
  const [documentNumber, setDocumentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/api/auth", { documentNumber, password });
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (err: any) {
      if (err.response?.status === 400 || err.response?.status === 401) {
        setError("CPF ou senha inválidos.");
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <section className="bg-[#ffa322] h-screen flex items-center justify-center px-5">
      <form
        onSubmit={handleLogin}
        className="bg-white flex flex-col items-center p-10 rounded-lg gap-10 max-w-sm w-full"
      >
        <h1 className="text-[#282828] font-medium text-xl">Entrar</h1>

        {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

        <div className="flex flex-col w-full gap-3">
          <input
            type="text"
            placeholder="Digite seu CPF"
            className="border border-gray-500 rounded-lg p-4 text-[#282828]"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua Senha"
            className="border border-gray-500 rounded-lg p-4 text-[#282828]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Button onClick={handleLogin} >Enviar</Button>
        </div>
      </form>
    </section>
  );
}
