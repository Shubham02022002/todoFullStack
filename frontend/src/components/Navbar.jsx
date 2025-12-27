import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTodos } from "../hooks/useTodos";

const Navbar = ({ logout, isAuthenticated }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      document.documentElement.getAttribute("data-theme") ||
      "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-semibold">Focusly</a>
      </div>
      {isAuthenticated && (
        <div className="flex items-center gap-3">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <button onClick={toggleTheme}>
                  Switch to {theme === "dark" ? "Light" : "Dark"}
                </button>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
