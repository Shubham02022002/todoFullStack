import { useState } from "react";
import success from "../components/Toast";

const API_URL = import.meta.env.VITE_API_URL;

export function useAuth(fetchTodos) {
  const [authLoading, setAuthLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const authenticate = async (endpoint, successMsg) => {
    try {
      setAuthLoading(true);

      const resp = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!resp.ok) throw new Error("Auth failed");

      success(successMsg);
      setFormData({ username: "", password: "" });
      setIsAuthenticated(true);
      fetchTodos();
    } catch (err) {
      console.error(err);
      alert("Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
  };

  return {
    formData,
    setFormData,
    authLoading,
    isAuthenticated,
    setIsAuthenticated,
    authenticate,
    logout,
  };
}
