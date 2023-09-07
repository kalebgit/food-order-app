import { useEffect, useState } from "react";
import Form from "../../../components/Forms/Form/Form"
import { ButtonGroup, Button, TextField, MenuItem } from "@mui/material"

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";


function AdminProduct(){

    const categoryCollection = collection(db, "productCategories")

    const [option, setOption] = useState('add');
    const [productCategories, setProductCategories] = useState([]);
    

    useEffect( ()=>{
        const getData = async()=>{
            const data =  await getDocs(categoryCollection)
            const filteredData = data.docs.map((doc)=>{
                return {...doc.data() }
            })
            setProductCategories(filteredData);
            console.log(filteredData);
        }

        getData()
        return ()=>{}
    }, [])

    let form = <></>


    const onSubmit = ()=>{
        
    }

    form = ()=>{
        switch(option){
            case 'add': 
                return (
                    <Form title="Agregar Producto" className="rounded-md 
                        bg-slate-100"
                        method="" action="">
                        <TextField id="name" name="name" key="name" label="Nombre" 
                            variant= "outlined"
                            type="text" required={true} placeholder='Escriba aqui...' 
                            size="small" fullWidth />
                        <TextField id="description" name="description" key="description" 
                            label="Descripcion" 
                            variant= "outlined"
                            type="text" required={true} placeholder='Escriba aqui...' 
                            size="small" fullWidth />
                        <TextField
                            id="outlined"
                            select
                            label="Category"
                            fullWidth
                            >
                            {productCategories.map((element) => (
                                <MenuItem key={element.category} 
                                value={element.category}>
                                {element.category}
                                </MenuItem>
                            ))}
                            </TextField>
                        <TextField id="price" name="price" key="price" label="Precio" 
                            variant= "outlined"
                            type="number" required={true} placeholder='Escriba aqui...' 
                            InputProps={{ inputProps: { min: 1 } }}
                            size="small" fullWidth />
                        <Button variant="contained">Subir</Button>
                    </Form> 
                )
            default: 
                return <></>
        }
    }


    return (
        <section className="py-5 flex flex-col justify-start items-center gap-8 ">
            <ButtonGroup variant="text" size="large">
                    <Button onClick={()=>{setOption('add')}}>Agregar</Button>
                    <Button onClick={()=>{setOption('remove')}}>Eliminar</Button>
            </ButtonGroup>
            {form()}
        </section>
    )
}

export default AdminProduct