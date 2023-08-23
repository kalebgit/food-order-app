import {useState} from 'react'

//sytles
import './Account.scss'

//my components
import Form from '../../components/Forms/Form/Form';
import Card from '../../components/Cards/Card/Card'

//mui 
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


function Account(){
    const [typeForm, setTypeForm] = useState({register: false, login: true});

    const onClickType = (event)=>{
        console.log(event);
        event.preventDefault();
        setTypeForm((prevState)=>{
                return {register: !prevState.register, login: !prevState.login}
        })
    }

    const inputs  = typeForm.register ? [
        
    ] : [
        <TextField id="username" key="username" label="Nombre de usuario" variant="outlined" type="text" 
            required={true} placeholder='Escriba aqui...' error={false} 
            helperText="" size="small" fullWidth />,
        <TextField id="password" key="password" label="Contraseña" variant="outlined" type="password" 
            required={true}
            placeholder='Escriba aqui...' error={false} helperText="" 
            size="small" fullWidth={true}
            // InputProps={{endAdornment: <InputAdornment position="end">
            //     <IconButton
            //       aria-label="toggle password visibility"
            //       onClick={handleClickShowPassword}
            //       onMouseDown={handleMouseDownPassword}
            //       edge="end"
            //     >
            //       {showPassword ? <VisibilityOff /> : <Visibility />}
            //     </IconButton>
            // </InputAdornment>}}
            />,
        <p>No tienes cuenta? <Link underline="hover" 
            onClick={onClickType}>Registrate</Link></p>,
    ];

    return (
        <main className="account__main min-h-screen p-6">

            <Form title={`${typeForm.login ? 'Iniciar Sesion' : 'Crear Cuenta'}`} 
                className="bg-white ">
                {inputs}
            </Form>
        </main>
        
    )
}

export default Account;