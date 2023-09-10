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
    
    onAuthStateChanged(auth, (authUser)=>{
        if(authUser){
            let cartCollection;
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
                            setCart((prevState)=>{
                                response.docs.map((product)=>{
                                    return {...product.data()}
                                })
                            })
                        })   
            }
        }
        
        const orderFunction = async()=>{
            await getInfo()
            await getCart
        }

        orderFunction();
        }
    })

    useEffect( ()=>{
        
        return ()=>{}
        
    }, [])


    const addProductCart = async(product)=>{
        if(context.isLoggedIn){
            const docRef = doc(db, cartCollection, product.id )
            setDoc(docRef, {name: product.name, price: product.price, 
                category: product.category, description: product.description})
        }
    }

    return (
        <CartContext.Provider value={{cart: cart, addProductCart: addProductCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider