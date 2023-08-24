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
    // estado que indica si la contrsenia es correcta 
    const [equals, setEquals] = useState(true);

    //valores del formulario
    const username = useRef();
    const password = useRef();
    const confirmationPassword = useRef();


    //recuperar informacion del storage para actualizar el estado de autenticacion
    useEffect(()=>{
        const StorageIsLoggedIn = localStorage.getItem('isLogged');
        if(StorageIsLoggedIn == '1'){
            setData((prevState)=>{
                return {isLoggedIn: true}
            })
        }
    }, [])

    //metodo que cambia el estado para que se muestre el nav
    const onClickType = (event)=>{
        console.log(event);
        event.preventDefault();
        setTypeForm((prevState)=>{
                return {register: !prevState.register, login: !prevState.login}
        })
    }

    //handler para registrar una cuenta
    const onRegister = (event)=>{
        event.preventDefault();
        if(password.current.value != confirmationPassword.current.value){
            setEquals(false);
        }else{
            setEquals(true)
        }
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
            helperText="" size="small" fullWidth
            inputRef={username}/>, 

            <TextField id="password" key="password" label="Contraseña" variant="outlined" type="password" 
            required={true}
            placeholder='Escriba aqui...' error={typeForm.register ? !equals : false} 
            size="small" fullWidth={true}
            inputRef={password}/>,



            typeForm.register ? 
            [
                <TextField id="confirmationpassword" key="confirmationpassword" label="Repite la Contraseña" variant="outlined" type="password" 
                    required={true}
                    placeholder='Escriba aqui...' error={!equals} 
                    helperText={`${typeForm.register ? (!equals ? 'No coinciden las contraseñas' : '') : ''}`}
                    size="small" fullWidth={true}
                    
                    inputRef={confirmationPassword}/>,

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


            <Button variant='contained' type="submit" key="submit">
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