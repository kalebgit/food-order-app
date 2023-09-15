import { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import { auth, db } from "../../config/firebase";
import { getDocs, collection, addDoc, doc, setDoc } from "firebase/firestore";
import AuthContext from "../Auth/AuthContext";


function CartContextProvider({children}){
    
    const context = useContext(AuthContext);

    const [cart, setCart] = useState([]);
    

    useEffect( ()=>{

            const getCart = async()=>{
                console.log("entramos a la function getCart")
                console.log(context.isLoggedIn)
                if(context.isLoggedIn){
                        getDocs(getCartCollection())
                            .then((response)=>{
                                console.log(resposne)
                                setCart((prevState)=>{
                                    const newCart = response.docs.map((product)=>{
                                        return [...prevState, ...product.data()]
                                    })
                                    console.log(newCart)
                                    return newCart;
                                })
                            })   
                }
            }
    
            getCart();
            
        return ()=>{}
        
    }, [cart])

    const getCartCollection = ()=>{
        const user =  JSON.parse(localStorage.getItem("user"));
        return collection(db, `clients/${user.docId}/cart`);
    }

    const addProductCart = async(productSubmit)=>{
        console.log(getCartCollection());
        console.log(productSubmit.id);
        if(context.isLoggedIn){
            const docRef = doc(db, getCartCollection(), productSubmit.id )
            const product = {name: productSubmit.name, price: productSubmit.price, 
                category: productSubmit.category, description: productSubmit.description}
            console.log("se agrega al carrito: ")
            console.log(product)
            setDoc(docRef, product)
            setCart((prevState)=>{
                return {...prevState, product}
            })
        }
    }

    return (
        <CartContext.Provider value={{cart: cart, addProductCart: addProductCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider