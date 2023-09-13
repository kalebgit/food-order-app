import { createContext } from "react";


const CartContext = createContext({cart: [], addProductCart: null});

export default CartContext