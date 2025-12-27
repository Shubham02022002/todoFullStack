import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async (onAuthFail) => {
    try {
      setLoading(true);
      const resp = await fetch(`${API_URL}/todos`, {
        credentials: "include",
      });

      if (!resp.ok) {
        onAuthFail?.();
        setTodos([]);
        return;
      }

      const data = await resp.json();
      setTodos(data);
    } catch (err) {
      console.error("Fetch todos failed:", err);
      onAuthFail?.();
    } finally {
      setLoading(false);
    }
  };

  return { todos, loading, fetchTodos, setTodos };
}
