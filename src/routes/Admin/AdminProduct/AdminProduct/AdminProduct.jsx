import { useEffect, useReducer, useState } from "react";
import Form from "../../../../components/Forms/Form/Form"
import { ButtonGroup, Button, TextField, MenuItem } from "@mui/material"

import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import AdminProductAdd from "../AdminProductAdd/AdminProductAdd";
import AdminProductDelete from "../AdminProductDelete/AdminProductDelete";



function AdminProduct(){

    const [option, setOption] = useState('add');

    const form = ()=>{
        switch(option){
            case 'add': 
                return (
                    <AdminProductAdd/>
                )
            case 'delete':
                return (
                    <AdminProductDelete/>
                )
            default: 
                return <></>
        }
    }


    return (
        <section className="py-5 flex flex-col justify-start items-center gap-8 ">
            <ButtonGroup variant="text" size="large">
                    <Button onClick={()=>{setOption('add')}}>Agregar</Button>
                    <Button onClick={()=>{setOption('delete')}}>Eliminar</Button>
            </ButtonGroup>
            {form()}
            
        </section>
    )
}

export default AdminProduct