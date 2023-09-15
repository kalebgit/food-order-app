import { onAuthStateChanged } from "@firebase/auth";
import { unstable_continueExecution } from "scheduler";
import { auth } from "../../config/firebase";
import StackContainer from "../../components/StackContainer/StackContainer";
import CartContext from "../../Contexts/Cart/CartContext";
import Item from "../../components/Item/Item";
import { useContext } from "react";
import { Button, Stack, cardActionAreaClasses } from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { SubjectSharp } from "@mui/icons-material";


function Cart(){
    const cartContext = useContext(CartContext)
    const checkpoints = ['recibiendo tu orden', 'cocinando', 'empaquetando', 
        'en espera de ser enviado', 'en camino', 'entregado', 'fin']
    console.log(cartContext.cart);

    

    return (
        <main className=" min-h-screen divide-x-2 divide-green-900">

            <h1 className="text-center text-4xl font-bold mb-10">Carrito</h1>

            {(cartContext.cart && cartContext.cart.length > 0) ? 
            <>
                <section className=" relative flex">
                    <StackContainer key="cart-products-container "
                    className="w-4/6 h-full gap-7 px-4 " vertical>
                        {
                        cartContext.cart.map((product)=>{
                            console.log(product);
                            return <Item key={product.id} product={product} horizontal/>
                        })}
                    </StackContainer>

                    <StackContainer className="w-2/6 h-full sticky top-0 p-5 gap-5
                        "
                        key="cart-order" vertical>
                            <h4 className="text-3xl text-center font-bold">Orden</h4>
                            <ul>
                                {cartContext.cart.map((cartProduct)=>{
                                    return <li key={cartProduct.id} className="text-xl">{cartProduct.name}: ${cartProduct.price} x {cartProduct.quantity} = ${cartProduct.price * cartProduct.quantity} </li>
                                })}
                                <li className="mt-5">
                                    <em className="text-2xl">Total: ${cartContext.cart.reduce((acum, element)=>{
                                        return acum + (element.price * element.quantity)
                                    }, 0)}</em>
                                </li>
                            </ul>
                            <Button variant="contained" size="large"
                                startIcon={<ShoppingBasketIcon/>}>
                                Comprar
                            </Button>
                    </StackContainer>
                </section>
                
            </>
            
            :
            <>
                <section className="flex flex-col h-96 justify-center 
                    items-center gap-5">
                <h2 className="text-3xl font-bold">No tienes productos en el 
                    carrito :c</h2>
                <img className="h-full object-cover" 
                    src="https://media.giphy.com/media/giXLnhxp60zEEIkq8K/giphy-downsized-large.gif"/>
                </section>
            </>}


            
            
        </main>
    )
}

export default Cart;