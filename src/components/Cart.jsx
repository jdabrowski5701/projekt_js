import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Cart() {
    const [product, setProduct]=useState([])

    const state = useSelector(state => state.handleCart)
    return (
        <div className='container m-auto text-center'>
            <h1 > Cart </h1>
            {
                console.log(useState([]))
            }
            <nav className="cart">
            </nav>
        </div>
        )
    }

export default Cart