import { ToastContainer, toast } from "react-toastify";
import AdviceContext from "./AdviceContext";
import "react-toastify/dist/ReactToastify.css";

function AdviceContextProvider({children}){

    const addCartToast = (promise)=>{
        toast.promise(
            promise, 
            {
                pending: "Agregando al carrito",
                success: "Producto agregado al carrito",
                error: "Hubo un error al agregar al carrito"
            }
        )
    }

    const removeCartToast = (promise)=>{
        toast.promise(
            promise, 
            {
                pending: "Eliminando del carrito",
                success: "Producto eliminado",
                error: "Hubo un error al eliminar el producto del carrito"
            }
        )
    }

    const addQuantityToast = (promise)=>{
        toast.promise(
            promise, 
            {
                pending: "Agregando (1) producto",
                success: "Producto agregado",
                error: "Error al actualizar"
            }
        )
    }

    const removeQuantityToast = (promise)=>{
        toast.promise(
            promise, 
            {
                pending: "Eliminando (1) producto",
                success: "Producto eliminando",
                error: "Cantidad minima: 1"
            }
        )
    }


    const addProductDataBaseToast = (promise)=>{
        toast.promise(
            promise, 
            {
                pending: "Agregando producto",
                success: "Producto agregado",
                error: "Error al agregar producto"

            }
        )
    }

    const removeProductDataBaseToast = (promise)=>{
        toast.promise(
            promise, 
            {
                pending: "Eliminando producto",
                success: "Producto eliminado",
                error: "Error al eliminar producto"

            }
        )
    }
    
    return (
        <AdviceContext.Provider value={{
            addCartToast: addCartToast,
            removeCartToast: removeCartToast, 
            addQuantityToast: addQuantityToast,
            removeQuantityToast: removeQuantityToast, 
            addProductDataBaseToast: addProductDataBaseToast, 
            removeProductDataBaseToast: removeProductDataBaseToast
        }}>
            
            {children}
        </AdviceContext.Provider>
    )
}

export default AdviceContextProvider;