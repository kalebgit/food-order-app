import { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import { auth, db } from "../../config/firebase";
import { getDocs, collection, addDoc, doc, setDoc } from "firebase/firestore";
import AuthContext from "../Auth/AuthContext";
import { set } from "immutable";
import { onAuthStateChanged } from "@firebase/auth";

function CartContextProvider({children}){
    
    const context = useContext(AuthContext);

    const [cart, setCart] = useState([]);
    let cartCollection;
    onAuthStateChanged(auth, (authUser)=>{
        if(authUser){
            
        const getInfo = async()=>{
            const user = await context.getUser(authUser.uid);
            if(context.isLoggedIn){
                cartCollection =  collection(db, 
                    `clients/${user.docId}/cart`) 
            }
        }
        
        

        const getCart = async()=>{
            if(context.isLoggedIn){
                    getDocs(cartCollection)
                        .then((response)=>{
                            console.log(response.docs)
                            setCart((prevState)=>{
                                response.docs.map((cart)=>{
                                    return [...cart.data()]
                                })
                            })
                        })   
            }
        }
        
        const orderFunction = async()=>{
            await getInfo()
            await getCart()
        }

        orderFunction();
        }
    })

    useEffect( ()=>{
        
        return ()=>{}
        
    }, [cart])


    const addProductCart = async(productSubmit)=>{
        console.log("se agrega al carrito: ")
        console.log(productSubmit)
        if(context.isLoggedIn){
            const docRef = doc(db, cartCollection, productSubmit.id )
            const product = {name: productSubmit.name, price: productSubmit.price, 
                category: productSubmit.category, description: productSubmit.description}
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