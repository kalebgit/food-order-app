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
    
    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    

    //recuperar informacion del storage para actualizar el estado de autenticacion
    useEffect(()=>{
        const StorageIsLoggedIn = localStorage.getItem('isLogged');
        if(StorageIsLoggedIn == '1'){
            setData((prevState)=>{
                return {isLoggedIn: true}
            })
        }
    }, [])

    //verificacion del forms
    useEffect(()=>{
        let timeout;
        if(!invalidUsername() && !invalidPassword() && !invalidEquals()){
            console.log("checking validity!");
            timeout = setTimeout(
                ()=>{
                    
                    console.log('is valid!!')
                    setValidForm(true);        
                }, 1000
            )
            
        }else{
            setValidForm(false);
        }
        
        
        return ()=>{
            console.log('CLEANUP')
            clearTimeout(timeout);
        }
        
    }, [username, password, confirmationPassword])


    //verificacion
    const invalidUsername = ()=>{
        if(username.length > 6){
            return false;
        }else{
            return true;
        }
    }

    const invalidPassword = ()=>{
        if(password.length > 8 && !(password.includes(' ')) && (password.charCodeAt(0) > 64 && 
            password.charCodeAt(0) < 91 ) && (()=>{
                let characters = ['#', '!', '$', '%', '&', '?']
                for(char of characters){
                    if(password.includes(char)){
                        return true;
                    }
                }
            })){
                return false;
        }else{
            return true;
        }
    }

    const invalidEquals = ()=>{
        if(password == confirmationPassword){
            return false;
        }else{
            return true;
        }
    }

    

    

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
        resetForm();
        setData((prevState)=>{
            return {isLoggedIn: true}
        })
    }


    //handler para iniciar sesion
    const onLogin = (event)=>{
        event.preventDefault();
        localStorage.setItem('isLogged', '1');
        resetForm();
        setData((prevState)=>{
            return {isLoggedIn: true}
        })
        
    }

    //reset all values for form
    const resetForm = ()=>{
        usernameRef.current.value = ''
        passwordRef.current.value = ''
        passwordConfirmationRef.current.value = ''
    }


    // los inputs son dinamicos, dependiendo de que tipo de registro sea
    const inputs = [
        <TextField id="username" key="username" label="Nombre de usuario" variant= "outlined"
            type="text" required={true} placeholder='Escriba aqui...' error={invalidUsername()}
            helperText={`${invalidUsername() ? 'Minimo 6 caracteres': ''}`} size="small" fullWidth 
            onChange={({target: {value}})=>{setUsername(value)}}
            inputRef={usernameRef}/>, 

            <TextField id="password" key="password" label="Contraseña" variant="outlined" type="password" 
            required={true}
            placeholder='Escriba aqui...' error={invalidPassword()} 
            helperText={`${invalidPassword() ? `Debe empezar con mayus y contener ${['#', '!', '$', '%', '&', '?'].join(' o ')}` : ''}`}
            size="small" fullWidth={true}
            onChange={({target: {value}})=>{setPassword(value)}}
            inputRef={passwordRef}/>,



            typeForm.register ? 
            [
                <TextField id="confirmationpassword" key="confirmationpassword" label="Repite la Contraseña" variant="outlined" type="password" 
                    required={true}
                    placeholder='Escriba aqui...' error={invalidEquals()} 
                    helperText={`${invalidEquals() ? 'no coinciden las contraseñas' : ''}`}
                    size="small" fullWidth={true}
                    onChange={({target: {value}})=>{setConfirmationPassword(value)}}
                    inputRef={passwordConfirmationRef}/>,

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