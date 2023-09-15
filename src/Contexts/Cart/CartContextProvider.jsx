import { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import { auth, db } from "../../config/firebase";
import { getDocs, collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import AuthContext from "../Auth/AuthContext";
import { onAuthStateChanged } from "firebase/auth";


function CartContextProvider({children}){
    
    const context = useContext(AuthContext);

    const [cart, setCart] = useState([]);
    const [user, setUser] = useState({});
    
    onAuthStateChanged(auth, (user)=>{
        if(user){
            setUser(user)
        }
    })

    useEffect(()=>{
        const getCart = async()=>{
            console.log("entramos a la function getCart")
            console.log(user)
            if(user){
                    updateCart();
            }
        }

        getCart();

        return ()=>{}
    }, [])

    const updateCart = ()=>{
        getDocs(getCartCollection(true))
                            .then((response)=>{
                                console.log(response)
                                setCart((prevState)=>{
                                    const newCart = response.docs.map((product)=>{
                                        return {...product.data()};
                                    })
                                    console.log(newCart)
                                    return newCart;
                                })
                            })           
    }

    const getCartCollection = (bycollection)=>{
        const user =  JSON.parse(localStorage.getItem("user"));
        if(bycollection == true){
            return collection(db, `clients/${user.docId}/cart`);
        }else{
            return `clients/${user.docId}/cart`
        }
        
    }

    const modifyQuantity = async(product)=>{
        const docRef = doc(db, getCartCollection(false), product.name)
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            const previosState = {...docSnap.data()}
            return {...previosState, quantity: previosState.quantity + 1}
        }else{
            return product
        }
    }

    const addProductCart = async(productSubmit)=>{
        console.log(getCartCollection());
        console.log(productSubmit.id);
        if(context.isLoggedIn){
            const product = {name: productSubmit.name, price: productSubmit.price, 
                category: productSubmit.category, 
                description: productSubmit.description, quantity: 1}
            
            const modifiedProduct = await modifyQuantity(product);
            console.log("se agrega al carrito: ")
            console.log(product)
            await setDoc(doc(db, getCartCollection(false), 
                ("" +productSubmit.name)), 
                modifiedProduct)
            updateCart();
        }
    }

    return (
        <CartContext.Provider value={{cart: cart, addProductCart: addProductCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider