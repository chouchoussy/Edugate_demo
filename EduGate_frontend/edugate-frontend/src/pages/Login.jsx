import { useState } from "react";
import api from "../api";          // kiểm tra đường dẫn đúng

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password: pw,
      });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/";
    } catch {
      setErr("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submit} className="login-box">
        <h1>EduGate Login</h1>
        {err && <div className="alert alert--error mb-2">{err}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
          className="mt-2"
        />
        <button className="btn w-full mt-2">Đăng nhập</button>
      </form>
    </div>
  );
}
