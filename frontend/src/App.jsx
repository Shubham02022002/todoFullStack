import { useEffect, useState } from "react";
import "./App.css";
import Todos from "./components/Todos";
import CreateTodo from "./components/CreateTodo";
import { ToastContainer } from "react-toastify";
import success from "./components/Toast";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const resp = await fetch(`${API_URL}/todos`, {
        credentials: "include",
      });
      if (!resp.ok) {
        setIsAuthenticated(false);
        setTodos([]);
        return;
      }
      const data = await resp.json();
      setTodos(data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Fetch todos failed:", err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const authenticate = async (endpoint, successMsg) => {
    try {
      setAuthLoading(true);
      const resp = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!resp.ok) {
        throw new Error("Authentication failed");
      }
      success(successMsg);
      setFormData({ username: "", password: "" });
      fetchTodos();
    } catch (err) {
      console.error(err);
      alert("Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignin = () => authenticate("signin", "Logged in!");
  const handleSignup = () => authenticate("signup", "Welcome to Todos.com!");

  const handleLogout = async () => {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    setIsAuthenticated(false);
    setTodos([]);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <ToastContainer />
      {!isAuthenticated && (
        <div className="auth-box">
          <h3>TODO.com</h3>
          <input
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <button disabled={authLoading} onClick={handleSignin}>
            Signin
          </button>
          <button disabled={authLoading} onClick={handleSignup}>
            Signup
          </button>
        </div>
      )}

      {isAuthenticated && (
        <>
          <h2>Your Todos</h2>
          {loading && <p>Loading...</p>}
          {!loading && todos.length === 0 && <p>No todos found</p>}
          <CreateTodo fetchTodos={fetchTodos} />
          <Todos todos={todos} />
          <button onClick={handleLogout}>Signout</button>
        </>
      )}
    </>
  );
}

export default App;
