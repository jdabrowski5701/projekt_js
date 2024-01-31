import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Nav } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((cart) => cart.handleCart);

  const addProduct = (product) => {
    dispatch(addCart(product));
    setIsModalOpen(true);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`http://localhost:8000/products/${id}`);    
      const data = await response.json();
      setProduct(data);
    };
    getProduct();
  }, [id]);

  const timer = setTimeout(() => {
    setIsModalOpen(false);
  }, 5000);

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.image}
                alt={product.title}
                width="500px"
                height="500px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.title}</h1>
              <p className="lead">
                <i className="bi bi-star-fill"></i>
                {" "}{product.rating && product.rating.rate}
                
              </p>
              <h3 className="display-6  my-4">${product.price}</h3>
              <p className="lead">{product.description}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
                
              ><i className ="bi bi-cart-plus"> </i>
                 Add to Cart
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div className="row">{ <ShowProduct />}</div>
      </div>
      {isModalOpen && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Item added to cart!</h5>
                </div>
                <div className="modal-body">
                  <p>Your item has been successfully added to the cart.</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                  <Link to="/cart" className="btn btn-primary">
                    Proceed to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Product;
