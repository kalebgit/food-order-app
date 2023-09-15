import { onAuthStateChanged } from "@firebase/auth";
import { unstable_continueExecution } from "scheduler";
import { auth } from "../../config/firebase";
import StackContainer from "../../components/StackContainer/StackContainer";
import CartContext from "../../Contexts/Cart/CartContext";
import Item from "../../components/Item/Item";
import { useContext } from "react";
import { Stack, cardActionAreaClasses } from "@mui/material";



function Cart(){
    const cartContext = useContext(CartContext)
    const checkpoints = ['recibiendo tu orden', 'cocinando', 'empaquetando', 
        'en espera de ser enviado', 'en camino', 'entregado', 'fin']
    console.log(cartContext.cart);



    return (
        <main className=" min-h-screen divide-x-2 divide-green-900">
            <h1 className="text-center text-4xl font-bold mb-8">Carrito</h1>
            <StackContainer key="cart-products-container"
            className="w-4/6 h-full " vertical>
                {(cartContext.cart && cartContext.cart.length > 0) && 
                cartContext.cart.map((product)=>{
                    console.log(product);
                    return <Item key={product.id} product={product} horizontal/>
                })}
            </StackContainer>

            <StackContainer className="w-2/6 h-full"
                key="cart-order" >
                    
            </StackContainer>
            
        </main>
    )
}

export default Cart;