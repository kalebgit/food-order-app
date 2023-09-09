import { Button } from '@mui/material';
import {Link} from 'react-router-dom'

function Navicon({title, onClick, startIcon, path}){
    return (
        <Link to={path} className="w-full">
            <Button variant="text" startIcon={startIcon}
            className='w-full' onClick={onClick}>{title}</Button>
        </Link>
    )
}

export default Navicon;