import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "../components";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.id]: ev.target.value });
    setErrors({ ...errors, [ev.target.id]: "" });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    let valid = true;

    if (!formData.email.trim()) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email is required",
        }));
        valid = false;
    } else if (!formData.email.includes("@")) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email should contain @ symbol",
        }));
        valid = false;
    }

    if (!formData.password.trim()) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Password is required",
        }));
        valid = false;
    }

    if (valid) {
      try {
        const response = await axios.post("YOUR_BACKEND_API_LOGIN_ENDPOINT", {
          email: formData.email,
          password: formData.password,
        });

        const { token } = response.data;
        localStorage.setItem("jwtToken", token);
        navigate("/");
      } catch (error) {
        alert("Login failed!");

        // Handle login failure, display error message, etc.
      }
    }
  };

  return (
    <>
      <Nav />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
              <label htmlFor="floatingInput">Email address</label>
                <input
                  type="email"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  id="floatingInput"
                  onChange={handleChange}
                />
              </div>
              <div className="my-3">
              <label htmlFor="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  id="floatingPassword"
                  onChange={handleChange}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit" >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
