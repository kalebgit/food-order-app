import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

//firebase
import {auth} from './config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useReducer } from 'react';



const onSignIn = async()=>{
    await createUserWithEmailAndPassword(auth, stateAuth.email.value, stateAuth.password.value)
}

function Auth(){
    const [stateAuth, dispatchAuth] = useReducer((state, action)=>{
        switch(action.type){
            case 'INPUT_EMAIL':
                return {
                    ...state,
                    email: {value: action.value, valid: action.value.includes('@')}
                }
            case 'INPUT_PASSWORD': 
                return {
                    ...state,
                    password: {value: action.value, valid: true}
                }
            default: 
                return {
                    ...state
                }
        }
    }, {email: {value: '', valid: false}, password: {value: '', valid: true}})


    return (
        <form onSubmit={onSignIn}>
            <TextField type="text" placeholder="Escribe Aqui..." label="Correo" 
                onChange={({target: {value}})=>{dispatchAuth({type: 'INPUT_EMAIL', value: value})}}/>
            <TextField type="password" placeholder="Escribe Aqui..." label="Password" 
            onChange={({target: {value}})=>{dispatchAuth({type: 'INPUT_PASSWORD', value: value})}}/>
            <Button startIcon={<SendIcon/>} type="submit"
                disabled={!(stateAuth.email.valid && stateAuth.password.valid)}>Enviar</Button>
        </form>
    )
}

export default Auth;
