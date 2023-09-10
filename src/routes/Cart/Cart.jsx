import { onAuthStateChanged } from "@firebase/auth";
import { unstable_continueExecution } from "scheduler";
import { auth } from "../../config/firebase";
import StackContainer from "../../components/StackContainer/StackContainer";
import ProgressBar from "../../components/ProgressBar/ProgressBar";



function Cart(){

    const checkpoints = ['recibiendo tu orden', 'cocinando', 'empaquetando', 
        'en espera de ser enviado', 'en camino', 'entregado', 'fin']

    return (
        <main>
            {/* <StackContainer/> */}
            <ProgressBar checkpoints={checkpoints}/>
        </main>
    )
}

export default Cart;