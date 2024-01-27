const cart = []

const handleCart = (state=cart, action) =>{
    const product = action.payload
    switch(action.type){
        case "ADDITEM":
            const exist_add = state.find((cart_p) => cart_p.id === product.id)
            if(exist_add){
                
                return state.map((cart_p)=>cart_p.id ===product.id?{...cart_p, qty: cart_p.qty+1}:cart_p)

            }else{

                return [...state, {...product, qty:1}]

            }
            break;
        case "DELITEM":
            const exist_del = state.find((cart_p) => cart_p.id === product.id)
            if(exist_del.qty === 1){
                return state.filter((cart_p)=>cart_p.id!==exist_del.id)
            }
            else{
                return state.map((cart_p)=> cart_p.id===product.id?{...cart_p, qty:cart_p.qty-1}:cart_p)
            }
            break;

        default:
            return state
            break;
    }
}

export default handleCart