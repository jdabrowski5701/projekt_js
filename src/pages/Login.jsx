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
        fetch("http://localhost:8000/users?email="+formData.email).then((res) => {
          return res.json();
        }).then((resp) => {
          if (Object.keys(resp).length === 0){
            alert('Please enter valid email')
          }else{
            if(resp.password == formData.password){
              alert('Success');
              sessionStorage.setItem('email', formData.email);
              navigate('/')
            }else{
              alert('Please enter valid data')
            }
          }
        });
      }
    }

  return (
    <>
      <Nav />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
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
