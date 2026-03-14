import React from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { signUp, error, handleError } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    handleError(null);
    const result = await signUp(data.name, data.username, data.email, data.password);

    if (result.success) {
      alert("successful");
      navigate("/login");
    } else {
      console.log("Signup error", result.error)
      handleError(result.error);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">Sign Up</h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
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
              {errors.name && (
                <span className="form-error">{errors.name.message}</span>
              )}
            </div>
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
                  // maxLength: {
                  //   value: 12, // remove entirely later
                  //   message: "Password must be less than 12 characters",
                  // },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>

            <button type="submit" className="btn btn-cta btn-large">
              Sign Up
            </button>
          </form>
          <div className="auth-switch">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="link">
                <span className="auth-link" onClick={() => handleError(null)}>Log In</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
