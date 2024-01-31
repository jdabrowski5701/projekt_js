import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Nav } from "../components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/action/index.js";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  
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

    const countries = ["Poland", "Germany", "France", "Spain", "UK", "Denmark"];

    const statesByCountry = {
      Poland: ["Podlasie", "Wielkopolska", "Mazowsze"],
      Germany: ["Bavaria", "North Rhine-Westphalia", "Baden-Württemberg"],
      France: ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes"],
      Spain: ["Catalonia", "Andalusia", "Madrid"],
      UK: ["England", "Scotland", "Wales"],
      Denmark: ["Capital Region", "Central Denmark Region", "Southern Denmark"]
    };

    const handleCountryChange = (e) => {
      const selectedCountryValue = e.target.value;
      setSelectedCountry(selectedCountryValue);
      setSelectedState("");
    };

    const handleChange = (ev) => {
      setFormData({ ...formData, [ev.target.id]: ev.target.value });
      setErrors({ ...errors, [ev.target.id]: "" });
    };



    const handleCheckout = (e) => {
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

      if (!selectedCountry) {
        setErrors((prevErrors) => ({ ...prevErrors, country: "Please select a valid country" }));
        return;
      }

      if (!selectedState) {
        setErrors((prevErrors) => ({ ...prevErrors, state: "Please select a valid state/province" }));
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

      setIsOrderPlaced(true);
      dispatch(resetCart());
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
                        <label for="firstName" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.firstName && "is-invalid"}`}
                          id="firstName"
                          placeholder=""
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                        {errors.firstName && (
                          <div className="invalid-feedback">
                            {errors.firstName}
                          </div>
                        )}
                      </div>

                      <div className="col-sm-6 my-1">
                        <label for="lastName" className="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder=""
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label for="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="you@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Please enter a valid email address for shipping
                          updates.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label for="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="Street 1234"
                          required
                          value={formData.address}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>

                      <div className="col-12">
                        <label for="address2" className="form-label">
                          Address 2{" "}
                          <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address2"
                          placeholder="Apartment or suite"
                          value={formData.address2}
                          onChange={handleChange}
                        />
                      </div>


                      <div className="col-md-3 my-1">
                        <label for="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          placeholder=""
                          required
                          value={formData.zip}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>

                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label for="cc-name" className="form-label">
                          Name on card
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-name"
                          placeholder=""
                          required
                          value={formData.cardName}
                          onChange={handleChange}
                        />
                        <small className="text-muted">
                          Full name as displayed on card
                        </small>
                        <div className="invalid-feedback">
                          Name on card is required
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label for="cc-number" className="form-label">
                          Credit card number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-number"
                          placeholder=""
                          required
                          value={formData.cardNumber}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Credit card number is required
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label for="cc-expiration" className="form-label">
                          Expiration
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-expiration"
                          placeholder=""
                          required
                          value={formData.cardExpiration}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Expiration date required
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label for="cc-cvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-cvv"
                          placeholder=""
                          required
                          value={formData.cardCVV}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Security code required
                        </div>
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
