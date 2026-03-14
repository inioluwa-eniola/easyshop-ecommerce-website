import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { logIn, error, handleError } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    handleError(null);
    const result = await logIn(data.username, data.password);
    if (result.success) {
      setIsSubmitting(true)
      alert("successful");  
      navigate("/");
    } else {
      handleError(result.error);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">Login</h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="form-input"
                type="text"
                id="username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <span className="form-error">{errors.username.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="password"
                placeholder=""
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12, // remove entirely later
                    message: "Password must be less than 12 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button disabled={isSubmitting} type="submit" className="btn btn-cta btn-large">
              {isSubmitting ? "Logging in ..." : "Login"}
            </button>
          </form>
          <div className="auth-switch">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="link">
                <span className="auth-link" onClick={() => handleError(null)}>Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
