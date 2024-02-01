import React from "react";

const Home = () => {
return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="https://cdn.pixabay.com/photo/2013/11/14/12/34/neckties-210347_1280.jpg"
            alt="Card"
            style={{ objectFit: "cover", height: "500px", width: "100%" }}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">New Season Arrivals</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
              Check out what's new in our store!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
