import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import Product from './Product'
import { useSelector } from 'react-redux'

function Cart() {
 const [product,setProduct]=useState([])

 useEffect(()=>{
  
  fetch('https://fakestoreapi.com/products')
  .then((res)=>res.json())
  .then(data=>setProduct(data))

 
 },[])

  return (
    <div className='container m-auto text-center'>

     <div style={{display:'flex',flexWrap:'wrap'}}>
     {
        product.length === 0 ?
        <Loading />
         :

         product.map((item,index)=>{
            return  <Product key={index} item={item}/>
         })
       
      }
        
     </div>
    </div>
  )
}

export default Cart
