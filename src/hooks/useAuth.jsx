import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("jwt")
  );

  useEffect(() => {
    const onStorage = () => {
      setIsAuthenticated(!!localStorage.getItem("jwt"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return isAuthenticated;
}
