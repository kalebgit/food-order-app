import { useEffect, useReducer, useState } from "react";
import Form from "../../../../components/Forms/Form/Form"
import { ButtonGroup, Button, TextField, MenuItem } from "@mui/material"

import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";



function AdminProductAdd(){

    const categoryCollection = collection(db, "productCategories")

    
    const [productCategories, setProductCategories] = useState([]);

    const [formData, dispatchFormData] = useReducer((state, action)=>{
        switch(action.type){
            case'INPUT_NAME':
                return { ...state, name: {value: action.value}}
            case'INPUT_DESCRIPTION':
                return { ...state, description: {value: action.value}}
            case'INPUT_CATEGORY':
                return { ...state, category: {value: action.value}}
            case'INPUT_PRICE':
                return { ...state, price: {value: action.value}}
            case'RESET': 
                return {name: {value: ''}, description: {value: ''}, category: {value: ''}, 
                price: {value: ''}}
        }
    }, {name: {value: ''}, description: {value: ''}, category: {value: ''}, 
        price: {value: ''}})
    

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


    const onSubmitProduct = async(event)=>{
        try{
            event.preventDefault();
            await addDoc(productsCollection, {name: formData.name.value, 
            description: formData.description.value, category: formData.category.value, 
            price: formData.price.value})
        }catch(err){
            console.log(err)
        }
        
    }

    


    return (
        <Form title="Agregar Producto" className="rounded-md 
                        bg-slate-100" onSubmit={onSubmitProduct}
                        method="" action="">
                        <TextField id="name" name="name" key="name" label="Nombre" 
                            variant= "outlined"
                            type="text" required={true} placeholder='Escriba aqui...' 
                            size="small" fullWidth 
                            value={formData.name.value}
                            onChange={({target:{value}})=>{
                                dispatchFormData({type: 'INPUT_NAME', 
                            value: value})}}/>
                        <TextField id="description" name="description" key="description" 
                            label="Descripcion" 
                            variant= "outlined"
                            type="text" required={true} placeholder='Escriba aqui...' 
                            size="small" fullWidth 
                            value={formData.description.value}
                            onChange={({target:{value}})=>{
                                dispatchFormData({type: 'INPUT_DESCRIPTION', 
                            value: value})}}/>
                        <TextField
                            id="outlined"
                            select
                            label="Category"
                            fullWidth
                            required
                            value={formData.category.value}
                            onChange={({target:{value}})=>{
                                dispatchFormData({type: 'INPUT_CATEGORY', 
                            value: value})}}
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
                            size="small" fullWidth 
                            value={formData.price.value}
                            onChange={({target:{value}})=>{
                                dispatchFormData({type: 'INPUT_PRICE', 
                            value: value})}}
                            />
                        <Button type="submit" variant="contained">Subir</Button>
                    </Form> 
    )
}

export default AdminProductAdd