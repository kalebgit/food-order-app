import { ToastContainer } from "react-toastify";
import AdviceContext from "./AdviceContext";


function AdviceContextProvider({children}){

    const addCart = ()=>{
        
    }
    
    return (
        <AdviceContext.Provider value={{}}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {children}
        </AdviceContext.Provider>
    )
}

export default AdviceContextProvider;