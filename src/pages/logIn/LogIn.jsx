import { useState } from "react";
import { AuthService } from "../../api/authService";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LogIn.module.css";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await AuthService.login({ email, password });
      setSuccess("Login successful!");
      navigate("/audit-x-toolkit");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Sign In</h1>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
          {error && (
            <div style={{ color: "red", gridColumn: "1 / -1" }}>{error}</div>
          )}
          {success && (
            <div style={{ color: "green", gridColumn: "1 / -1" }}>
              {success}
            </div>
          )}
          <div className={styles.register}>
            <span>Don't have an account?</span>
            <Link to="/register" className={styles.registerLink}>
              Register
            </Link>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
