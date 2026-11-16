import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "todoapp-kappa-henna.vercel.app/api/user/register",
        { name, email, password }
      );

      alert(res.data.message || "Registration successful");
      nav("/user");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/user">Login</Link>
      </p>
    </div>
  );
}