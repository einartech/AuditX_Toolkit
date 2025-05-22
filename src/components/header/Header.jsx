import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../logo/Logo";
import Button from "../button/Button";
import Navbar from "../navbar/Navbar";
import { useAuth } from "../../hooks/useAuth";
import { AuthService } from "../../api/authService";
import { useUser } from "../../hooks/useUser";

export default function Header() {
  const isAuthenticated = useAuth();
  const user = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/log-in");
    window.location.reload();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.navbar}>
        <Navbar />
      </nav>
      <div className={styles.userInfo}>
        {isAuthenticated && user && (
          <span
            className={styles.userLink}
            onClick={() => navigate("/profile-edit")}
            title="Edit your profile"
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/profile-edit");
            }}
          >
            {user.username}
          </span>
        )}
      </div>
      <div className={styles.buttons}>
        {!isAuthenticated && (
          <Link to="/log-in">
            <Button label="Log In" />
          </Link>
        )}
        {isAuthenticated && <Button label="Log Out" onClick={handleLogout} />}
      </div>
    </header>
  );
}
