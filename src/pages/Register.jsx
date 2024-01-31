import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "../components";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        name: "",
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

        if (!formData.name.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: "This field is required",
            }));
            valid = false;
        }

        if (!formData.email.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Email is required",
            }));
            valid = false;
        } else if (!formData.email.includes("@")) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Check your email",
            }));
            valid = false;
        }

        if (!formData.password.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "This field is required",
            }));
            valid = false;
        } else if (formData.password.length < 8 || !/\d/.test(formData.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password should be at least 8 characters long, contain at least 1 number and 1 special character",
            }));
            valid = false;
        }

        if (valid) {
            try {
              const response = await axios.post("http://localhost:8000/users", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
              });
      
              const { token } = response.data;
              localStorage.setItem("jwtToken", token);
              alert("Registration successful!");
              navigate("/");

            } catch (error) {
              alert("Registration failed!");
      
            }
          }
    };

    return (
        <>
            <Nav />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name && "is-invalid"}`}
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                            <div className="form my-3">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email && "is-invalid"}`}
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="form  my-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password && "is-invalid"}`}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                            <div className="my-3">
                                <p>
                                    Already has an account?{" "}
                                    <Link to="/login" className="text-decoration-underline text-info">
                                        Login
                                    </Link>{" "}
                                </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={!formData.name || !formData.email || !formData.password}>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
