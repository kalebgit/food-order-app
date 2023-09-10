
import { Typography } from '@mui/material';
import './Home.scss'
// import CirclesContainer from '../../components/Grids/Circles/CirclesContainer/CirclesContainer';
// import Circle from '../../components/Grids/Circles/Circle/Circle'

// import Hotdog from '../../assets/img/home/hot-dog.png'
// import Burger from '../../assets/img/home/burger.webp'
// import Pizza from '../../assets/img/home/pizza.webp'
// import IceCream from '../../assets/img/home/ice-cream.png'
// import Sushi from '../../assets/img/home/sushi.webp'
// import Donut from '../../assets/img/home/donought.png'
// import Cake from '../../assets/img/home/cake.webp'
// import PopCorn from '../../assets/img/home/popcorn.webp'
// import Item from '../../components/Item/Item';

import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState} from 'react';
import { ref, listAll, getDownloadURL} from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import Scroll from '../../components/Scroll/Scroll';
import Item from '../../components/Item/Item';


//colors
/*
primary: #FFEDBC
secondary: #FFF4D6

primary: #FFE4D3
secondary: #FFEFE5

primary: #E4BAD4
secondary: #F6DFEB

primary: #9EB384
secondary: #CEDEBD
*/



function Home(){

    const [products, setProducts] = useState([]);

    const productsCollection = collection(db, "products");


    

    useEffect(()=>{
        
        const getProducts = async ()=>{
            const data = await getDocs(productsCollection)
            const filteredData = data.docs.map((doc)=>{
                
                return {
                    id: doc.id,
                    //returns all the fields as attributes to js
                    ...doc.data(), 
                    images: [],
                    
                }
            });

            for(let i = 0; i < filteredData.length; i++){
                let refFolderImages = ref(storage, `products/${filteredData[i].id}`)
                let {items} = await listAll(refFolderImages);
                console.log("los items")
                console.log(items)
                let images = []
                for(let y = 0; y < items.length; y++){
                    const url = await getDownloadURL(items[y]);
                    console.log(url);
                    images.push(url)
                }
                console.log(images)
                filteredData[i]  = {...filteredData[i], images: [...images]}
            }
            console.log("el nuevo estado es")
            console.log(filteredData);

            setProducts(filteredData);
            // setProducts((prevState)=>{
            //     console.log(prevState);
            //     return prevState
            // })
        }

        getProducts();
        return ()=>{}
    }, [])

    return (
        <main className="main-home min-h-screen pt-14">
            <Typography key="home-title" variant='h2' component="h1" className="text-center main-home__title"  
                gutterBottom>Food Mood</Typography>
            <Scroll key="scroll-bar" horizontal>
                {products.length > 0 ? 
                products.map((element)=>{
                    console.log(element);
                    return <Item key={element.id} product={element}/>
                })
                : 
                <h2>Cargando...</h2>}
            </Scroll>
        </main>
    )
}

export default Home;