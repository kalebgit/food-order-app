import { createContext } from "react";


const AdviceContext = createContext({
    addCartToast: null,
    removeCartToast: null, 
    addQuantityToast: null,
    removeQuantityToast: null, 
    addProductDataBaseToast: null, 
            removeProductDataBaseToast: null
})

export default AdviceContext