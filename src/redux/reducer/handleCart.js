//initial cart - empty
const initialCart = JSON.parse(localStorage.getItem("cart") || "[]");

const handleCart = (cart = initialCart, action) => {
  // Extract product information from the action payload
  const product = action.payload;

    //handle cart actions
  switch (action.type) {
    case "ADD_ITEM":
      const existingProductAdd = cart.find((cartProduct) => cartProduct.id === product.id);

      if (existingProductAdd) {
        //update quantity
        return cart.map((cartProduct) =>
          cartProduct.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct
        );
      } else {
        //add to cart
        return [...cart, { ...product, quantity: 1 }];
      }

    case "REMOVE_ITEM":
      // Check if the product exists in the cart
      const existingProductRemove = cart.find((cartProduct) => cartProduct.id === product.id);

      if (existingProductRemove && existingProductRemove.quantity === 1) {
        // remove from cart
        return cart.filter((cartProduct) => cartProduct.id !== existingProductRemove.id);
      } else {
        //update quantity
        return cart.map((cartProduct) =>
          cartProduct.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity - 1 } : cartProduct
        );
      }
    
    case "RESET_CART":
        return []; 

    default:
      return cart; 
  }
};

export default handleCart;
