import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const resp = await fetch("http://localhost:3000/user/todos", {
        method: "GET",
        credentials: "include",
      });
      if (!resp.ok) {
        setTodos([]);
        setIsAuthenticated(false);
        return;
      }
      const data = await resp.json();
      setTodos(data || []);
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
      alert("Username and password required");
      return;
    }
    const resp = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    if (!resp.ok) {
      alert("Signup failed");
      return;
    }
    toast.success("Welcome to Todos.com!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setIsAuthenticated(true);
    fetchTodos();
  };
  const handleSignin = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (!username || !password) {
      alert("Username and password required");
      return;
    }
    const resp = await fetch("http://localhost:3000/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    if (!resp.ok) {
      alert("Signin failed");
      return;
    }
    toast.success("Logged in!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setIsAuthenticated(true);
    fetchTodos();
  };
  const handleLogout = async () => {
    await fetch("http://localhost:3000/user/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
    setTodos([]);
  };

  return (
    <>
      {!isAuthenticated && (
        <div style={{ display: "flex", flexDirection: "column", width: 240 }}>
          <h3>TODO.com</h3>
          <input id="username" placeholder="username" />
          <input id="password" type="password" placeholder="password" />
          <button onClick={handleSignin}>Signin</button>
          <button onClick={handleSignup}>Signup</button>
        </div>
      )}
      {isAuthenticated && (
        <>
          <h2>Your Todos</h2>
          {loading && <p>Loading...</p>}
          {!loading && todos.length === 0 && <p>No todos found</p>}
          {todos.map((todo, idx) => (
            <Todo key={idx} {...todo} />
          ))}
          <button onClick={handleLogout}>Signout</button>
        </>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

function Todo({ title, description, completed }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{completed ? "✅ Completed" : "⏳ Pending"}</span>
    </div>
  );
}

export default App;
