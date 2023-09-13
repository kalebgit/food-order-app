import { onAuthStateChanged } from "@firebase/auth";
import { unstable_continueExecution } from "scheduler";
import { auth } from "../../config/firebase";
import StackContainer from "../../components/StackContainer/StackContainer";
import CartContext from "../../Contexts/Cart/CartContext";
import Item from "../../components/Item/Item";
import { useContext } from "react";



function Cart(){
    const cartContext = useContext(CartContext)
    const checkpoints = ['recibiendo tu orden', 'cocinando', 'empaquetando', 
        'en espera de ser enviado', 'en camino', 'entregado', 'fin']

    return (
        <main>
            <StackContainer>
                {cartContext.cart && cartContext.cart.length > 0 && 
                cartContext.cart.map((product)=>{
                    return <Item {...product}/>
                })}
            </StackContainer>
            
        </main>
    )
}

export default Cart;