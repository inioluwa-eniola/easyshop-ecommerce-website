import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);
  const { signUp, user, login } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError(null);
    let result;
    if (mode === "signup") {
      result = await signUp(data.name, data.email, data.password);
    } else {
      result = await login(data.email, data.password);
    }

    if (result.success) {
      alert("successful");
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && <p>User logged in: {user.email} </p>}
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}

            {mode === "signup" && (
              <>
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">
                    Full Name
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="full-name"
                    placeholder="John Doe"
                    {...register("name", { required: "Full name is required" })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="username"
                    placeholder="John Doe"
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    placeholder="jdoe@gmail.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <span className="form-error">{errors.email.message}</span>
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
                    <span className="form-error">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </>
            )}

            {mode === "login" && (
              <>
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
                  {errors.email && (
                    <span className="form-error">{errors.email.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    placeholder="jdoe@gmail.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <span className="form-error">{errors.email.message}</span>
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
                    <span className="form-error">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </>
            )}
            <button type="submit" className="btn btn-cta btn-large">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>
          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span className="auth-link" onClick={() => setMode("login")}>
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span className="auth-link" onClick={() => setMode("signup")}>
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
