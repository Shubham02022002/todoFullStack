import { useEffect, useRef } from "react";

const LoginForm = ({ formData, setFormData, onSignin, onSignup, loading }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <fieldset className="fieldset bg-base-200 border rounded-box w-xs p-4 m-10">
      <legend className="fieldset-legend">Login</legend>

      <label>Email</label>
      <input
        ref={inputRef}
        value={formData.username}
        onChange={(e) =>
          setFormData((p) => ({ ...p, username: e.target.value }))
        }
        className="input"
      />

      <label>Password</label>
      <input
        type="password"
        value={formData.password}
        onChange={(e) =>
          setFormData((p) => ({ ...p, password: e.target.value }))
        }
        className="input"
      />

      <button disabled={loading} onClick={onSignin} className="btn mt-2">
        Sign In
      </button>
      <button disabled={loading} onClick={onSignup} className="btn mt-2">
        Sign Up
      </button>
    </fieldset>
  );
};

export default LoginForm;
