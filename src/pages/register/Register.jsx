import { useState } from "react";
import { UserService } from "../../api/userService";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "greSaRe",
    name: "Grecia",
    surname: "Sanchez",
    pronouns: "Ella/She",
    email: "grelsare13@gmail.com",
    password: "Password123!",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await UserService.register(form);
      setSuccess("User registered successfully!");
      // Opcional: limpiar formulario o redirigir
      // setForm({ username: "", name: "", surname: "", pronouns: "", email: "", password: "" });
    } catch (err) {
      setError(err.message || "Registration failed.");
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Register</h1>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              placeholder="Enter your surname"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pronouns">Pronouns</label>
            <input
              type="text"
              id="pronouns"
              name="pronouns"
              value={form.pronouns}
              onChange={handleChange}
              placeholder="e.g. she/her, he/him, they/them"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Register
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
            <span>Already have an account?</span>
            <Link to="/log-in" className={styles.registerLink}>
              Sign In
            </Link>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
