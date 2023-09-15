import { useEffect, useReducer, useState } from "react";
import Form from "../../../../components/Forms/Form/Form"
import { ButtonGroup, Button, TextField, MenuItem } from "@mui/material"
import UploadIcon from '@mui/icons-material/Upload';

import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { storage } from "../../../../config/firebase";
import {ref, uploadBytes} from 'firebase/storage'
import { v4 } from "uuid";
import AdviceContext from "../../../../Contexts/Advice/AdviceContext";



function AdminProductAdd(){

    const adviceContext = useContext(AdviceContext)

    const categoryCollection = collection(db, "productCategories")
    const productsCollection = collection(db, "products");
    
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
            case 'INPUT_IMAGE':
                return {...state, imageUpload: {value: action.value}}
            case'RESET': 
                return {name: {value: ''}, description: {value: ''}, category: {value: ''}, 
                price: {value: ''}, imageUpload: {value: null}}
        }
    }, {name: {value: ''}, description: {value: ''}, category: {value: ''}, 
        price: {value: ''}, imageUpload: {value: null}})
    

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
            const docRef = await addDoc(productsCollection, {name: formData.name.value, 
            description: formData.description.value, category: formData.category.value, 
            price: formData.price.value});
            imageUpload(docRef.id);
            dispatchFormData({type: 'RESET'})
            return Promise.resolve()
        }catch(err){
            console.log(err)
            return Promise.reject()
        }
        
    }

    const imageUpload = (productId)=>{
        if(formData.imageUpload.value == null) return;
        //ref es el lugar a donde quieres guardar la imagen
        let imageId 
        let imageRef 
        for(let file of formData.imageUpload.value){
            imageId = file.name + v4();
            imageRef = ref(storage, `/products/${productId}/${imageId}`);
            uploadBytes(imageRef, file)
            .then((response)=>{
                console.log("image uploaded")
            })
            .catch((err)=>{
                console.log(err)
            })
        }

    }


    return (
        <Form title="Agregar Producto" className="rounded-md 
                        bg-slate-100" onSubmit={()=>{
                            adviceContext.addProductDataBaseToast(
                                onSubmitProduct()
                            )
                        }}
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
                        <label className=" self-start " for="imagen">
                            Imagen del producto </label>
                        <input type="file" name="imagen" onChange={({target: {files}})=>{
                            dispatchFormData({type: 'INPUT_IMAGE', value: files})
                        }} multiple/>
                        <Button type="submit" variant="contained">Subir</Button>
                    </Form> 
    )
}

export default AdminProductAdd