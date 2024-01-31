import React from 'react'
import {Nav, Product } from "../components"

const Products = () => {
  return (
    <>
      <Nav />
      <div className="container py-3">
              <h5 className="card-title fs-1 text fw-lighter text-center">Our products</h5>
      </div>
      <Product />
    </>
  )
}

export default Products