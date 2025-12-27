import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Todos from "./components/Todos";
import CreateTodo from "./components/CreateTodo";
import LoginForm from "./components/LoginForm";
import { ToastContainer } from "react-toastify";

import { useTodos } from "./hooks/useTodos";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { todos, loading, fetchTodos, setTodos } = useTodos();

  const {
    formData,
    setFormData,
    authLoading,
    isAuthenticated,
    setIsAuthenticated,
    authenticate,
    logout,
  } = useAuth(() => fetchTodos(() => setIsAuthenticated(false)));

  useEffect(() => {
    fetchTodos(() => setIsAuthenticated(false));
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar logout={logout} isAuthenticated={isAuthenticated} />

      {!isAuthenticated && (
        <div className="flex justify-center">
          <LoginForm
            formData={formData}
            setFormData={setFormData}
            loading={authLoading}
            onSignin={() => authenticate("signin", "Logged in!")}
            onSignup={() => authenticate("signup", "Welcome!")}
          />
        </div>
      )}

      {isAuthenticated && (
        <>
          <h2>Your Todos</h2>
          {loading && <p>Loading...</p>}
          {!loading && todos.length === 0 && <p>No todos found</p>}
          <CreateTodo fetchTodos={fetchTodos} />
          <Todos todos={todos} />
        </>
      )}

      <Footer />
    </>
  );
}

export default App;
