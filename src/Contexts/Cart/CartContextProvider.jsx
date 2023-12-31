import { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import { auth, db, storage } from "../../config/firebase";
import { getDocs, collection, addDoc, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import AuthContext from "../Auth/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { getCollapseUtilityClass } from "@mui/material";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { AddToQueueRounded } from "@mui/icons-material";


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
            // console.log("entramos a la function getCart")
            // console.log(user)
            if(user){
                    updateCart();
            }
        }

        getCart();

        return ()=>{}
    }, [])

    const updateCart = async()=>{
        const response = await getDocs(getCartCollection(true));
        const newData = response.docs.map((product)=>{
            return {...product.data()}
        })


        //se puede hacer un custom hook 

        for(let i = 0; i < newData.length; i++){
            let refFolderImages = ref(storage, `products/${newData[i].id}`)
            let {items} = await listAll(refFolderImages);
            // console.log("los items")
            // console.log(items)
            let images = []
            for(let y = 0; y < items.length; y++){
                const url = await getDownloadURL(items[y]);
                // console.log(url);
                images.push(url)
            }
            // console.log(images)
            newData[i]  = {...newData[i], images: [...images]}
        }     

        
        setCart(()=>{
            console.log("new cart")
            console.log(newData);
            return newData});

        return Promise.resolve
    }

    const getCartCollection = (bycollection)=>{
        const user =  JSON.parse(localStorage.getItem("user"));
        if(bycollection == true){
            return collection(db, `clients/${user.docId}/cart`);
        }else{
            return `clients/${user.docId}/cart`
        }
        
    }

    const modifyQuantity = async(product, quantity)=>{
        const docRef = doc(db, getCartCollection(false), product.id)
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            const previousState = {...docSnap.data()}
            if((previousState.quantity > 1 && quantity < 0) || 
                (previousState.quantity >= 1 && quantity > 0)){
                const newProduct = {...previousState, quantity: previousState.quantity + quantity}
                console.log("new product");
                console.log(newProduct);
                return  newProduct
            }else{
                return Promise.reject()
            }
            
        }else{
            console.log("no existe el docuemnto")
            return Promise.reject()
        }
    }

    const addProductCart = async(productSubmit, add)=>{
        // console.log(getCartCollection());
        // console.log(productSubmit.id);
        if(context.isLoggedIn){
            const product = {...productSubmit, quantity: 1}
            
            const modifiedProduct = await modifyQuantity(product, (add ? (1) : (-1)));
            console.log("se agrega al carrito: ")
            console.log(product)
            await setDoc(doc(db, getCartCollection(false), 
                ("" +productSubmit.id)), 
                modifiedProduct)
            return updateCart();
            
        }else{
            console.log("no tiene acceso porque no tiene cuenta")
            return Promise.reject()
        }
    }

    const deleteProductCart = async(productDelete)=>{
        if(context.isLoggedIn){
            const docRef = doc(db, getCartCollection(false), productDelete.id)
            await deleteDoc(docRef);
            console.log("producto eliminado")
        }
        return updateCart();
    }

    return (
        <CartContext.Provider value={{cart: cart, addProductCart: addProductCart, 
        deleteProductCart: deleteProductCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider