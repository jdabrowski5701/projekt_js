//initial cart - empty
const initialCart = [];

const handleCart = (state = initialCart, action) => {
  // Extract product information from the action payload
  const product = action.payload;

    //handle cart actions
  switch (action.type) {
    case "ADD_ITEM":
      const existingProductAdd = state.find((cartProduct) => cartProduct.id === product.id);

      if (existingProductAdd) {
        //update quantity
        return state.map((cartProduct) =>
          cartProduct.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct
        );
      } else {
        //add to cart
        return [...state, { ...product, quantity: 1 }];
      }

    case "REMOVE_ITEM":
      // Check if the product exists in the cart
      const existingProductRemove = state.find((cartProduct) => cartProduct.id === product.id);

      if (existingProductRemove && existingProductRemove.quantity === 1) {
        // remove from cart
        return state.filter((cartProduct) => cartProduct.id !== existingProductRemove.id);
      } else {
        //update quantity
        return state.map((cartProduct) =>
          cartProduct.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity - 1 } : cartProduct
        );
      }

    default:
      return state; //cart state
  }
};

export default handleCart;
