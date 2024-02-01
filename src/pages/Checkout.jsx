import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Nav } from "../components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/action/index.js";
import axios from "axios";
const Checkout = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  

  useEffect(() => {
    const userEmail = sessionStorage.getItem("email");

    if (!userEmail) {
      navigate("/login");
    }
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    cardExpiration: "",
    cardCVV: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    cardExpiration: "",
    cardCVV: "",
  });

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="bi bi-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };


  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 15.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.quantity);
    });

    state.map((item) => {
      return (totalItems += item.quantity);
    });


    const handleCheckout = async (e) => {
      e.preventDefault();

      if (!e.target.firstName.value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, firstName: "First name is required" }));
        return;
      }

      if (!e.target.lastName.value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, lastName: "Last name is required" }));
        return;
      }

      const emailRegex = /\S+@\S+\.\S+/;
      if (!e.target.email.value.trim() || !emailRegex.test(e.target.email.value)) {
        setErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email address" }));
        return;
      }

      if (!e.target.address.value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, address: "Address is required" }));
        return;
      }

      if (!e.target.country.value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, country: "Please enter country name" }));
        return;
      }

      if (!e.target.state.value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, state: "Please enter state name" }));
        return;
      }

      const zipRegex = /^\d+$/;
      if (!e.target.zip.value || !zipRegex.test(e.target.zip.value)) {
        setErrors((prevErrors) => ({ ...prevErrors, zip: "Zip code must contain only numbers" }));
        return;
      }

      if (!e.target.cardName.value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, cardName: "Name on card is required" }));
        return;
      }

      const cardNumberRegex = /^\d{16}$/;
      if (!e.target.cardNumber.value || !cardNumberRegex.test(e.target.cardNumber.value)) {
        setErrors((prevErrors) => ({ ...prevErrors, cardNumber: "Credit card number must be 16 digits long and contain only numbers" }));
        return;
      }

      const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!e.target.cardExpiration.value || !expirationRegex.test(e.target.cardExpiration.value)) {
        setErrors((prevErrors) => ({ ...prevErrors, cardExpiration: "Expiration date must be in format MM/YY" }));
        return;
      }

      const cvvRegex = /^\d{3}$/;
      if (!e.target.cardCVV.value || !cvvRegex.test(e.target.cardCVV.value)) {
        setErrors((prevErrors) => ({ ...prevErrors, cardCVV: "CVV must be 3 digits long and contain only numbers" }));
        return;
      }

      const orderDetails = {
        user_email: sessionStorage.getItem("email"),
        items: state,
        billing_address: {
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          email: e.target.email.value,
          address: e.target.address.value,
          address2: e.target.address2.value,
          country: e.target.country.value,
          state: e.target.state.value,
          zip: e.target.zip.value,
        },
        payment_details: {
          cardName: e.target.cardName.value,
          cardNumber: e.target.cardNumber.value,
          cardExpiration: e.target.cardExpiration.value,
          cardCVV: e.target.cardCVV.value,
        },
        totalAmount: Math.round(subtotal + shipping),
      };
      try {
        const response = await axios.post("http://localhost:8000/orders", orderDetails, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status == 201) {
          setIsOrderPlaced(true);
          dispatch(resetCart());
          alert("Order placed successfully!");
        } else {
          alert("Failed to place the order. Please try again.");
          
        }
      } catch (error) {

        alert("An unexpected error occurred. Please try again later.");
      }
    };


    return (
      <>
        {isOrderPlaced ? (
          <div className="text-center">
            <h2>Order placed successfully!</h2>
          </div>
        ) : (
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${Math.round(subtotal + shipping)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleCheckout}>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label htmlFor="firstName" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.firstName && "is-invalid"}`}
                          id="firstName"
                          placeholder=""
                          required
                        />
                          {errors.firstName && (
                          <div className="invalid-feedback">
                              {errors.firstName}
                          </div>
                          )}
                      </div>

                      <div className="col-sm-6 my-1">
                        <label htmlFor="lastName" className="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.lastName && "is-invalid"}`}
                          id="lastName"
                          placeholder=""
                          required
                        />
                          {errors.lastName && (
                          <div className="invalid-feedback">
                              {errors.lastName}
                          </div>
                          )}
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className={`form-control ${errors.email && "is-invalid"}`}
                          id="email"
                          placeholder="you@example.com"
                          required
                        />
                          {errors.email && (
                          <div className="invalid-feedback">
                              {errors.email}
                          </div>
                          )}
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.address && "is-invalid"}`}
                          id="address"
                          placeholder="Street 1234"
                          required
                        />
                          {errors.address && (
                          <div className="invalid-feedback">
                              {errors.address}
                          </div>
                          )}
                      </div>

                      <div className="col-12">
                        <label htmlFor="address2" className="form-label">
                          Address 2{" "}
                          <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.address2 && "is-invalid"}`}
                          id="address2"
                          placeholder="Apartment or suite"
                        />
                          {errors.address2 && (
                          <div className="invalid-feedback">
                              {errors.address2}
                          </div>
                          )}
                      </div>

                      <div className="col-md-5 my-1">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.country && "is-invalid"}`}
                          id="country"
                          placeholder="Country"
                        />
                          {errors.country && (
                          <div className="invalid-feedback">
                              {errors.country}
                          </div>
                          )}
                      </div>
                      <div className="col-md-4 my-1">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <br />
                        <input
                          type="text"
                          className={`form-control ${errors.state && "is-invalid"}`}
                          id="state"
                          placeholder="State"
                        />
                          {errors.state && (
                          <div className="invalid-feedback">
                              {errors.state}
                          </div>
                          )}
                      </div>

                      <div className="col-md-3 my-1">
                        <label htmlFor="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          type="number"
                          className={`form-control ${errors.zip && "is-invalid"}`}
                          id="zip"
                          placeholder=""
                          required
                        />
                          {errors.zip && (
                          <div className="invalid-feedback">
                              {errors.zip}
                          </div>
                          )}
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>

                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label htmlFor="cardName" className="form-label">
                          Name on card
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardName && "is-invalid"}`}
                          id="cardName"
                          placeholder=""
                          required
                        />
                        <small className="text-muted">
                          Full name as displayed on card
                        </small>
                        {errors.cardName && (
                          <div className="invalid-feedback">
                              {errors.cardName}
                          </div>
                          )}
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="cardNumber" className="form-label">
                          Credit card number
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardNumber && "is-invalid"}`}
                          id="cardNumber"
                          placeholder=""
                          required
                        />
                        {errors.cardNumber && (
                          <div className="invalid-feedback">
                              {errors.cardNumber}
                          </div>
                          )}
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="cardExpiration" className="form-label">
                          Expiration
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardExpiration && "is-invalid"}`}
                          id="cardExpiration"
                          placeholder=""
                          required
                        />
                        {errors.cardExpiration && (
                          <div className="invalid-feedback">
                              {errors.cardExpiration}
                          </div>
                          )}
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="cardCVV" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardCVV && "is-invalid"}`}
                          id="cardCVV"
                          placeholder=""
                          required
                        />
                        {errors.cardCVV && (
                          <div className="invalid-feedback">
                              {errors.cardCVV}
                          </div>
                          )}
                      </div>
                    </div>

                    <hr className="my-4" />

                    <button
                      className="w-100 btn btn-primary "
                        type="submit"
                        disabled={isOrderPlaced}
                      >
                        Continue to checkout
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <Nav />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>

    </>
  );
};

export default Checkout;
