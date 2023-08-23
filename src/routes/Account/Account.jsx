import {useState, useRef} from 'react'

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

function Account(){
    // define el tipo de formulario (inicar sesion o registrarse)
    const [typeForm, setTypeForm] = useState({register: true, login: false});

    // estado que indica si la contrsenia es correcta 
    const [equals, setEquals] = useState(false);

    //valores del formulario
    const username = useRef();
    const password = useRef();
    const confirmationPassword = useRef();

    

    //metodo que cambia el estado para que se muestre el nav
    const onClickType = (event)=>{
        console.log(event);
        event.preventDefault();
        setTypeForm((prevState)=>{
                return {register: !prevState.register, login: !prevState.login}
        })
    }


    // los inputs son dinamicos, dependiendo de que tipo de registro sea
    const inputs  = typeForm.register ? [
        <TextField id="username" key="username" label="Nombre de usuario" variant= "outlined"
            type="text" required={true} placeholder='Escriba aqui...' error={false}
            helperText="" size="small" fullWidth
            inputRef={username}/>, 

            <TextField id="password" key="password" label="Contraseña" variant="outlined" type="password" 
            required={true}
            placeholder='Escriba aqui...' error={false} helperText="" 
            size="small" fullWidth={true}
            inputRef={password}/>,

            <TextField id="password" key="password" label="Repite la Contraseña" variant="outlined" type="password" 
            required={true}
            placeholder='Escriba aqui...' error={false} helperText="" 
            size="small" fullWidth={true}
            inputRef={confirmationPassword}/>,

            <p>Ya tienes cuenta? <Link underline="hover" 
            onClick={onClickType}>Inicia Sesion</Link></p>,

            <Button variant='contained' onClick={()=>{}}>
                Registrate
            </Button>
    ] : [
        <TextField id="username" key="username" label="Nombre de usuario" variant="outlined" type="text" 
            required={true} placeholder='Escriba aqui...' error={false} 
            helperText="" size="small" fullWidth 
            inputRef={username}/>,

        <TextField id="password" key="password" label="Contraseña" variant="outlined" type="password" 
            required={true}
            placeholder='Escriba aqui...' error={false} helperText="" 
            size="small" fullWidth={true}
            inputRef={password}/>,

        <p>No tienes cuenta? <Link underline="hover" 
            onClick={onClickType}>Registrate</Link></p>,

            <Button variant='contained' onClick={()=>{}}>
                Iniciar Sesion
            </Button>
    ];

    return (
        <main className="account__main min-h-screen p-6 flex flex-col justify-center ">
            <Card hasImage={true} image={AccountFormImage}>
                <Form title={`${typeForm.login ? 'Iniciar Sesion' : 'Crear Cuenta'}`} 
                    className="bg-white">
                    {inputs}
                </Form>
            </Card>
            
        </main>
        
    )
}

export default Account;