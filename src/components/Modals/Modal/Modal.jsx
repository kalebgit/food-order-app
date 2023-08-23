import { Typography, Button } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import './Modal.scss'

function Modal(){
    const onClose = ()=>{

    }
    return (
        <article className="modal fixed overflow-hidden rounded-lg bg-white z-50">
            <Typography variant="h4" className=" bg-blue-800 text-center py-2 text-white">Titulo Generico</Typography>
            <div className="p-5 flex flex-col flex-nowrap justify-start items-center gap-4">
            <Typography variant="body1" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur 
                earum aut corrupti tempore nisi, excepturi in consectetur nihil error dolor.</Typography>
            <Button variant="contained" color="error" 
            endIcon={<HighlightOffIcon/>} onClick={onClose}>Cerrar</Button>
            </div>
        </article>
    )
}

export default Modal;