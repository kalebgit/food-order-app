import { createContext } from "react";


const CartContext = createContext({cart: null, addProductCart: null});

export default CartContext