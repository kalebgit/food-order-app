import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../../config/firebase";
import DataTable from "../../../../components/Tables/DataTable/DataTable";
import AdviceContext from "../../../../Contexts/Advice/AdviceContext";



function AdminProductDelete(){

    const adviceContext = useContext(AdviceContext)

    const [numChanges, setNumChanges] = useState(0);
    const [products, setProducts] = useState([]);

    const productsCollection = collection(db, "products");


    useEffect(()=>{
        
        const getProducts = async()=>{
            const data = await getDocs(productsCollection);
            const finalData = data.docs.map((doc)=>{
                const previousData = {...doc.data()}
                return {name: previousData.name, 
                        price: previousData.price,
                        category: previousData.category,
                        id: doc.id}
            })

            console.log(finalData);

            setProducts((prevState)=>{
                console.log(finalData)
                return finalData;
            })

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
            <DataTable data={products} title="Productos" 
            onDeleteData={()=>{
                adviceContext.removeProductDataBaseToast(
                    onDeleteProduct()
                )
            }}/>
            : 
            <h2 className="font-bold">No hay productos</h2>
            }
        </>
        
            
    )
}

export default AdminProductDelete;