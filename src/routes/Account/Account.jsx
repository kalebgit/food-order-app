import {useState, useRef, useEffect} from 'react'

import { useOutletContext } from 'react-router-dom';
//sytles
import './Account.scss'

//my components
import Form from '../../components/Forms/Form/Form';
import Card from '../../components/Cards/Card/Card'

//mui 
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
// import { IconButton, InputAdornment } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

//images
import AccountFormImage from '../../assets/img/account/account-form.jpg'
import { Button } from '@mui/material';
import Modal from '../../components/Modals/Modal/Modal';
import Effect from '../../page/Effect/Effect';
import { PasswordRounded } from '@mui/icons-material';

function Account(){
    //contexto de router dom
    const [data, setData] = useOutletContext();

    // define el tipo de formulario (inicar sesion o registrarse)
    const [typeForm, setTypeForm] = useState({register: true, login: false});
    // estado que indica si el formulario es correcto
    const [validForm, setValidForm] = useState(false);
    

    //valores del formulario
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');


    //recuperar informacion del storage para actualizar el estado de autenticacion
    useEffect(()=>{
        const StorageIsLoggedIn = localStorage.getItem('isLogged');
        if(StorageIsLoggedIn == '1'){
            setData((prevState)=>{
                return {isLoggedIn: true}
            })
        }
    }, [])


    //verificacion
    const checkUsername = ()=>{
        if(username.length > 6){
            return true;
        }else{
            return false;
        }
    }

    const checkPassword = ()=>{
        if(password.length > 12 && !(password.includes(' ')) && (password.charCodeAt(0) > 64 && 
            password.charCodeAt(0) < 91 ) && (password.includes(['#', '!', '$', '%', '&', '?']))){
                return true;
        }else{
            return false
        }
    }

    const checkEquals = ()=>{
        if(password == confirmationPassword){
            return true;
        }else{
            return false;
        }
    }

    //verificacion del forms
    useEffect(()=>{
        if(checkUsername && checkPassword && checkEquals){
            setValidForm(true);
        }
    }, [username, password, confirmationPassword])

    

    //metodo que cambia el estado para que se muestre el nav
    const onClickType = (event)=>{
        event.preventDefault();
        setTypeForm((prevState)=>{
                return {register: !prevState.register, login: !prevState.login}
        })
    }

    //handler para registrar una cuenta
    const onRegister = (event)=>{
        event.preventDefault();
        localStorage.setItem('isLogged', '1');
        setData((prevState)=>{
            return {isLoggedIn: true}
        })
    }


    //handler para iniciar sesion
    const onLogin = (event)=>{
        event.preventDefault();
        localStorage.setItem('isLogged', '1');
        setData((prevState)=>{
            return {isLoggedIn: true}
        })
        
    }


    // los inputs son dinamicos, dependiendo de que tipo de registro sea
    const inputs = [
        <TextField id="username" key="username" label="Nombre de usuario" variant= "outlined"
            type="text" required={true} placeholder='Escriba aqui...' error={false}
            helperText={`${checkUsername ? '': 'Minimo 6 caracteres'}`} size="small" fullWidth 
            onChange={({target: {value}})=>{setUsername(value)}}/>, 

            <TextField id="password" key="password" label="Contraseña" variant="outlined" type="password" 
            required={true}
            placeholder='Escriba aqui...' error={false} 
            size="small" fullWidth={true}
            onChange={({target: {value}})=>{setPassword(value)}}/>,



            typeForm.register ? 
            [
                <TextField id="confirmationpassword" key="confirmationpassword" label="Repite la Contraseña" variant="outlined" type="password" 
                    required={true}
                    placeholder='Escriba aqui...' error={false} 
                    helperText={`${''}`}
                    size="small" fullWidth={true}
                    onChange={({target: {value}})=>{setConfirmationPassword(value)}}/>,

                <p  key="LoginMessage">
                    Ya tienes cuenta? 
                    <Link underline="hover" onClick={onClickType}> Inicia Sesion</Link>
                </p> 
            ]
                
            
            : 
            <p key="RegisterMessage">
                No tienes cuenta? 
                <Link underline="hover" onClick={onClickType} > Registrate</Link>
            </p>,,


            <Button variant='contained' type="submit" key="submit"
                disabled={!validForm}>
                {typeForm.register ? "Registrar" : "Iniciar Sesion"}
            </Button>
            
    ]

    //componente
    return (
        <main className="account__main min-h-screen p-6 flex flex-col justify-center ">
            <Card hasImage={true} image={AccountFormImage}>
                <Form title={`${typeForm.login ? 'Iniciar Sesion' : 'Crear Cuenta'}`} 
                    onSubmit={typeForm.register ? 
                        onRegister : onLogin}
                    className="bg-white">
                    {inputs}
                </Form>
            </Card>
        </main>
        
    )
}

export default Account;