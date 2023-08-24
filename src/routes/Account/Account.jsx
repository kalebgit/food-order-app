import {useState, useRef, useEffect, useReducer} from 'react'

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
import { Button, Typography } from '@mui/material';
import Modal from '../../components/Modals/Modal/Modal';
import Effect from '../../page/Effect/Effect';

function Account(){
    //contexto de router dom
    const [data, setData] = useOutletContext();

    // reducer que define todos los tipos de validaciones y valores para el formulario
    const [formState, dispatchForm] = useReducer((state, action)=>{
        switch(action.type){
            case 'RESET_INPUTS': 
                return {
                    ...state, 
                    username: {value: '', valid: false},
                    password: {value: '', valid: false},
                    duplicatePassword: {value: '', valid: false}
                }
            case 'INPUT_VALIDFORM':
                return {
                    ...state,
                    validForm: action.value
                }
            case 'INPUT_TYPEFORM': 
                let object  = {
                    ...state,
                    typeForm: {register: !(state.typeForm.register), login: !(state.typeForm.login)}
                }

                console.log(object)
                return object
            case 'INPUT_USERNAME':
                return {
                    ...state,
                    username: {value: action.value, valid: action.value.length > 6}
                }
            case 'INPUT_PASSWORD': 
                return {
                    ...state,
                    password: {value: action.value, valid: (action.value.length > 8 && 
                        !(action.value.includes(' ')) && (action.value.charCodeAt(0) > 64 && 
                        action.value.charCodeAt(0) < 91 ))}
                }
            case 'INPUT_DUPLICATEPASSWORD': 
                return {
                    ...state,
                    duplicatePassword: {value: action.value, valid: (action.value === state.password.value)}
                }
            default: 
                return {...state}
        }
    }, {
        typeForm: {register: true, login: false}, 
        validForm: false,
        username: {value: '', valid: false},
        password: {value: '', valid: false},
        duplicatePassword: {value: '', valid: false}
    });

    
    

    //recuperar informacion del storage para actualizar el estado de autenticacion
    useEffect(()=>{
        const StorageIsLoggedIn = localStorage.getItem('isLogged');
        if(StorageIsLoggedIn == '1'){
            setData((prevState)=>{
                return {isLoggedIn: true}
            })
        }
    }, [])


    useEffect(()=>{
        dispatchForm({type: 'RESET_INPUTS'})
    }, [formState.typeForm])
    

    //verificacion del forms
    useEffect(()=>{
        let timeout;
        if(formState.username.valid && formState.password.valid && formState.duplicatePassword.valid){
            console.log("checking validity!");
            timeout = setTimeout(
                ()=>{
                    
                    console.log('is valid!!')
                    dispatchForm({type: 'INPUT_VALIDFORM', value: true})     
                }, 1000
            )
            
        }else{
            console.log('invalid')
            dispatchForm({type: 'INPUT_VALIDFORM', value: false});
        }
        
        
        return ()=>{
            console.log('CLEANUP')
            clearTimeout(timeout);
        }
        
    }, [formState.username.value, formState.password.value, formState.duplicatePassword.value])

    //metodo que cambia el estado para que se muestre el nav
    const onClickType = (event)=>{
        event.preventDefault();
        dispatchForm({type: 'INPUT_TYPEFORM'})
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
            type="text" required={true} placeholder='Escriba aqui...' 
            error={!formState.username.valid}
            helperText={`${!formState.username.valid ? 'Minimo 6 caracteres': ''}`} 
            size="small" fullWidth 
            onChange={({target: {value}})=>{dispatchForm({type: 'INPUT_USERNAME', value: value})}}
            value={formState.username.value}/>, 

            <TextField id="password" key="password" label="Contraseña" variant="outlined" 
            type="password" 
            required={true}
            placeholder='Escriba aqui...' error={!formState.password.valid} 
            helperText={`${!formState.password.valid ? 
                formState.typeForm.register ? 
                `Debe empezar con mayus y minimo 8 caracteres de longitud` : '' : ''}`}
            size="small" fullWidth={true}
            onChange={({target: {value}})=>{dispatchForm({type: 'INPUT_PASSWORD', value: value})}}
            value={formState.password.value}/>,



            formState.typeForm.register ? 
            [
                <TextField id="confirmationpassword" key="confirmationpassword" 
                    label="Repite la Contraseña" variant="outlined" type="password" 
                    required={true}
                    placeholder='Escriba aqui...' error={!formState.duplicatePassword.valid} 
                    helperText={`${!formState.duplicatePassword.valid ? 'no coinciden las contraseñas' : ''}`}
                    size="small" fullWidth={true}
                    onChange={({target: {value}})=>{
                        dispatchForm(
                            {
                                type: 'INPUT_DUPLICATEPASSWORD', 
                                value: value
                            })
                        }}
                    value={formState.duplicatePassword.value}/>,

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
                disabled={!formState.validForm}>
                {formState.typeForm.register ? "Registrar" : "Iniciar Sesion"}
            </Button>
            
    ]

    //componente
    return (
        <main className="account__main min-h-screen p-6 flex flex-col justify-center ">
            {data.isLoggedIn ? 

                <Typography variant="h2" className="text-center">Bienvenido De Nuevo
                😀</Typography>
            :
            <Card hasImage image={AccountFormImage}>
                <Form title={`${formState.typeForm.login ? 'Iniciar Sesion' : 'Crear Cuenta'}`} 
                    onSubmit={formState.typeForm.register ? 
                        onRegister : onLogin}
                    className="bg-white">
                    {inputs}
                </Form>
            </Card>
            }
            
        </main>
        
    )
}

export default Account;