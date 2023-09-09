import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../../config/firebase";
import DataTable from "../../../../components/Tables/DataTable/DataTable";



function AdminProductDelete(){

    const [numChanges, setNumChanges] = useState(0);
    const [products, setProducts] = useState([]);

    const productsCollection = collection(db, "products");

    useEffect(()=>{
        
        const getProducts = async()=>{
            const data = await getDocs(productsCollection);
            const finalData = data.docs.map((doc)=>{
                return {...doc.data(), id: doc.id}
            })

            console.log(finalData);

            setProducts(finalData)

        }

        try{
            getProducts();    
        }catch(err){
            console.log(err);
        }
        
        return ()=>{}
    }, [numChanges]);


    const onDeleteProduct = async(id)=>{
        console.log("se ha eliminado")
        const productDoc = doc(db, "products", id);
        const result = await deleteDoc(productDoc)
        console.log(result);
        setNumChanges((prevState)=>{return prevState + 1});
    }

    return (
        <>
            {products.length > 0 ? 
            <DataTable data={products} title="Productos" onDeleteData={onDeleteProduct}/>
            : 
            <h2 className="font-bold">No hay productos</h2>
            }
        </>
        
            
    )
}

export default AdminProductDelete;