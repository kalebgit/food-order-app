import { useState } from "react";
import CartContext from "./CartContext";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function CartContextProvider(){
    const [cart, setCart] = useState([]);

    const clientsCollection = collection(db, "carts")

    useEffect( async ()=>{
        
        try{
            const data = await getDocs(clientsCollection);
            console.log(data);
        }catch(err){
            console.log(err);
        }

        return ()=>{}
        
    }, [])

    return (
        <CartContext.Provider value={cart}>

        </CartContext.Provider>
    )
}