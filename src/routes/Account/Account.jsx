import {useState, useRef, useEffect, useReducer, useContext} from 'react'

import { useOutletContext } from 'react-router-dom';
//sytles
import './Account.scss'

//my components
import Form from '../../components/Forms/Form/Form';
import Card from '../../components/Cards/Card/Card'


//react router


//mui 
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import LoginIcon from '@mui/icons-material/Login';
// import { IconButton, InputAdornment } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

//images
import AccountFormImage from '../../assets/img/account/account-form.jpg'
import { Button, Icon, IconButton, Typography } from '@mui/material';
import Modal from '../../components/Modals/Modal/Modal';
import Effect from '../../page/Effect/Effect';
import { FactorId } from '@firebase/auth';


import AuthContext from '../../Contexts/Auth/AuthContext';




function Account(){

    const context = useContext(AuthContext)
    
    // reducer que define todos los tipos de validaciones y valores para el formulario
    const [formState, dispatchForm] = useReducer((state, action)=>{
        switch(action.type){
            case 'RESET_INPUTS': 
                return {
                    ...state, 
                    email: {value: '', valid: false},
                    password: {value: '', valid: false},
                    duplicatePassword: {value: '', valid: false},
                    enable: {email: false, password: false, duplicate: false}
                }
            case 'INPUT_VALIDFORM':
                return {
                    ...state,
                    validForm: action.value
                }
            case 'INPUT_TYPEFORM': 
                let object  = {
                    ...state,
                    typeForm: {register: !(state.typeForm.register), login: 
                        !(state.typeForm.login)}
                }

                console.log(object)
                return object
            case 'INPUT_NAME':
                return {
                    ...state,
                    name: {value: action.value, valid: action.value.length >= 3}
                }
            case 'INPUT_PHONE':
                return {
                    ...state,
                    phoneNumber: {value: action.value, valid: action.value.length == 10}
                }
            case 'INPUT_EMAIL':
                return {
                    ...state,
                    email: {value: action.value, valid: action.value.includes('@')}
                }
            case 'INPUT_PASSWORD': 
                return {
                    ...state,
                    password: {value: action.value, valid: (action.value.length > 8 && 
                        !(action.value.includes(' ')) && (action.value.charCodeAt(0) > 
                            64 && 
                        action.value.charCodeAt(0) < 91 ))}
                }
            case 'INPUT_DUPLICATEPASSWORD': 
                return {
                    ...state,
                    duplicatePassword: {value: action.value, valid: (action.value === 
                        state.password.value)}
                }
            case 'ONBLUR':
                switch(action.subtype){
                    case 'NAME': 
                        return {
                            ...state, 
                            enable: {...state.enable, name: true}
                        }
                    case 'PHONE': 
                        return {
                            ...state, 
                            enable: {...state.enable, phoneNumber: true}
                        }
                    case 'EMAIL': 
                        return {
                            ...state, 
                            enable: {...state.enable, email: true}
                        }
                    case 'PASSWORD': 
                        return {
                            ...state, 
                            enable: {...state.enable, password: true}
                        }
                    case 'DUPLICATE': 
                        return {
                            ...state, 
                            enable: {...state.enable, duplicate: true}
                        }
                    default: 
                        return {
                            ...state
                        }
                }
            default: 
                return {...state}
        }
    }, {
        typeForm: {register: true, login: false}, 
        validForm: false,
        name: {value: '', valid: false},
        phoneNumber: {value: '', valid: false},
        email: {value: '', valid: false},
        password: {value: '', valid: false},
        duplicatePassword: {value: '', valid: false},
        enable: {name: false, phoneNumber: false, 
            email: false, password: false, duplicate: false}
    });

    
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(()=>{
        dispatchForm({type: 'RESET_INPUTS'})
    }, [formState.typeForm])
    

    //verificacion del forms
    useEffect(()=>{
        let timeout;
        if(formState.email.valid && formState.password.valid 
            && (formState.typeForm.register ? formState.duplicatePassword.valid : 
                true)){
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
        
    }, [formState.email.value, formState.password.value, 
            formState.duplicatePassword.value])


    

    

    //metodo que cambia el estado para que se muestre el nav
    const onClickType = (event)=>{
        event.preventDefault();
        dispatchForm({type: 'INPUT_TYPEFORM'})
    }


    // los inputs son dinamicos, dependiendo de que tipo de registro sea
    const inputs = [
        formState.typeForm.register ? 
        [
            <TextField id="name" name="name" key="name" label="Nombre" 
            variant= "outlined"
            type="text" required={true} placeholder='Escriba aqui...' 
            error={(!formState.name.valid && formState.enable.name)}
            onBlur={()=>{dispatchForm({type: 'ONBLUR', subtype: 'NAME'})}}
            helperText={`${(!formState.name.valid && formState.enable.name) 
                ? 'Debe ser un nombre valido (mayor a 3 caracteres)': ''}`} 
            size="small" fullWidth 
            onChange={({target: {value}})=>{dispatchForm({type: 'INPUT_NAME', 
                value: value})}}
            value={formState.name.value}/>, 

        <TextField id="phoneNumber" name="phoneNumber" key="phoneNumber" label="Numero 
        de telefono" 
            variant= "outlined"
            type="phoneNumber" required={true} placeholder='Escriba aqui...' 
            error={(!formState.phoneNumber.valid && formState.enable.phoneNumber)}
            onBlur={()=>{dispatchForm({type: 'ONBLUR', subtype: 'PHONE'})}}
            helperText={`${(!formState.phoneNumber.valid && formState.enable.phoneNumber) 
                ? 'Debe ser un numero valido (10 posiciones)': ''}`} 
            size="small" fullWidth 
            onChange={({target: {value}})=>{dispatchForm({type: 'INPUT_PHONE', 
                value: value})}}
            value={formState.phoneNumber.value}/>
        ] : <></>, 

        <TextField id="email" name="email" key="email" label="Correo" 
            variant= "outlined"
            type="tel" required={true} placeholder='Escriba aqui...' 
            error={(!formState.email.valid && formState.enable.email)}
            onBlur={()=>{dispatchForm({type: 'ONBLUR', subtype: 'EMAIL'})}}
            helperText={`${(!formState.email.valid && formState.enable.email) 
                ? 'Debe ser un correo': ''}`} 
            size="small" fullWidth 
            onChange={({target: {value}})=>{dispatchForm({type: 'INPUT_EMAIL', 
                value: value})}}
            value={formState.email.value}/>, 

            <TextField id="password" name='password' key="password" label="Contraseña" 
            variant="outlined" 
            type="password" 
            required={true}
            placeholder='Escriba aqui...' error={(!formState.password.valid  && 
                formState.enable.password)} 
            onBlur={()=>{dispatchForm({type: 'ONBLUR', subtype: 'PASSWORD'})}}
            helperText={`${(!formState.password.valid  && 
                formState.enable.password) ? 
                formState.typeForm.register ? 
                `Debe empezar con mayus y minimo 8 caracteres de longitud` : '' : ''}`}
            size="small" fullWidth={true}
            onChange={({target: {value}})=>{dispatchForm({type: 'INPUT_PASSWORD', 
            value: value})}}
            value={formState.password.value}/>,



            formState.typeForm.register ? 
            [
                <TextField id="confirmationpassword" key="confirmationpassword" 
                    label="Repite la Contraseña" variant="outlined" type="password" 
                    name="confirmationpassword"
                    required={true}
                    placeholder='Escriba aqui...' 
                    error={(!formState.duplicatePassword.valid && 
                        formState.enable.duplicate)} 
                    onBlur={()=>{dispatchForm({type: 'ONBLUR', subtype: 'DUPLICATE'})}}
                    helperText={`${(!formState.duplicatePassword.valid && 
                        formState.enable.duplicate) 
                        ? 'no coinciden las contraseñas' : ''}`}
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
            </p>,


            <Button variant='contained' type="submit" key="submit"
                disabled={!formState.validForm} startIcon={<LoginIcon/>}>
                {formState.typeForm.register ? "Registrar" : "Iniciar Sesion"}
            </Button>, 

            // <p className="text-sm text-center w-full" key="loginMessage">
            //     <em>O continuar con</em> 
            // </p>,
            // <section className='p-1' key="loginOptions">
            //     <IconButton onClick={signInGoogle}>
            //         <GoogleIcon fontSize='large'/>
            //     </IconButton>
            //     {/* <IconButton>
            //         <FacebookIcon fontSize="large"/>
            //     </IconButton>
            //     <IconButton>
            //         <AppleIcon fontSize="large"/>
            //     </IconButton> */}
            // </section>
            
    ]

    //componente
    return (
        <main className="account__main min-h-screen p-6 flex flex-col justify-center ">
            {context.isLoggedIn ? 
                <h1 className="text-center font-bold text-xl">
                Bienvenido 🍃
                </h1>

                :

                <Card hasImage image={AccountFormImage}>
                <Form title={`${formState.typeForm.login ? 'Iniciar Sesion' : 
                    'Crear Cuenta'}`} 
                    onSubmit={(event)=>{
                        event.preventDefault();
                        dispatchForm({type: 'RESET_INPUTS'})
                        try{
                            if(formState.typeForm.register){
                                context.registerEmail(formState)
                            }else{
                                context.signInEmail(formState)
                            }
                            
                            setErrorMessage('')
                        }catch(err){
                            switch(err.code){
                                case 'auth/email-already-in-use': 
                                    setErrorMessage('el correo ya esta registrado')
                            }
                        }
                    }}
                    className="bg-white">
                    {inputs}
                </Form>
                </Card>
                
            }
            
            
            
        </main>
        
    )
}

export default Account;