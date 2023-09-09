import { Typography } from '@mui/material';
import './Form.scss'

function Form({title, children, className, onSubmit, method, action}){
    return (
        <form className={`form p-5 ${className}`} onSubmit={onSubmit} method={method}
            action={action}>
            <fieldset className="flex flex-col flex-nowrap justify-start items-center gap-4">
                <legend className='text-center'><Typography variant='h4' gutterBottom>{title}</Typography></legend>
                {children}
            </fieldset>
        </form>
    )
}

export default Form;