// add item to cart
export const addCart = (product) => {
    return {
        type:"ADD_ITEM",
        payload:product
    }
}

//remove item from cart
export const delCart = (product) => {
    return {
        type:"REMOVE_ITEM",
        payload:product
    }
}