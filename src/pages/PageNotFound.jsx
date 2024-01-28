import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "../components";

const PageNotFound = () => {
  return (
    <>
      <Nav />
      <div className="container my-3 py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
              <h4 className="p-3 display-5">Page Not Found!</h4>
              <Link to="/" className="btn  btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Go to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
