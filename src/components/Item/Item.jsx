
import { IconButton, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import './Item.scss'
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../Contexts/Cart/CartContext';

//material ui
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';

function Item({horizontal, vertical, product: {id, name, price, category, description, 
    images, quantity}}){

    const cartContext = useContext(CartContext)

    

    return (
        <article className={`relative rounded-md  overflow-hidden ${
            vertical && " item-vertical p-4 flex flex-col justify-between items-stretch "
        } ${horizontal && " item-horizontal p-2 w-full grid grid-cols-3 grid-flow-col grid-rows-1 " + 
            " justify-items-start items-center gap-8"}`}
            style={vertical ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), 
            rgba(0, 0, 0, 0.5)), url(${images[0]})`} : {}}
            id={id}>

                {vertical &&
                <>
                    <div className='w-full'>
                    <Tooltip title="Agregar al carrito">
                        <IconButton style={{color: 'green'}}
                            onClick={()=>{
                                cartContext.addProductCart({id: id, name: name, 
                                price: price, category: category, 
                                description: description}, false)
                            }}>
                            <AddShoppingCartIcon fontSize='large' 
                                style={{color: 'white'}}/>
                        </IconButton>
                    </Tooltip>    
                    <Tooltip title="Favoritos">
                        <IconButton style={{color: 'red'}}>
                            <FavoriteBorderIcon fontSize='large' 
                                style={{color: 'white'}}/>
                        </IconButton>
                    </Tooltip>
                        
                
                    
                </div>

                <div className='w-full flex flex-col flex-nowrap justify-start items-start 
                        gap-1'>
                    <h3 className="text-4xl text-white">{name}</h3>
                    <p className='text-2xl text-green-400'>$ {price}</p>
                    <div className=' text-lg text-gray-400 flex flex-row flex-wrap 
                        justify-start items-start divide-x-2 divide-gray-400'>
                        <p className="px-2 text-md">{category}</p>
                        <p className="px-2 text-md"></p>
                    </div>
                </div>
                </>}
                

                {horizontal &&
                <>  
                    <div className="absolute top-0 right-0">
                        <IconButton onClick={()=>{
                            const productSent = {
                                id: id,
                                name: name,
                                description: description, 
                                category: category,
                                price: price, 
                                images: images, 
                                quantity: quantity
                            }
                            console.log("product sent: ")
                            console.log(productSent)
                            cartContext.deleteProductCart(productSent)
                        }}>
                            <ClearIcon fontSize='large'/>
                        </IconButton>
                    </div>
                    
                    <div className="h-full rounded-lg overflow-hidden">
                        <img className="item-horizontal__imgage 
                        h-full w-screen object-cover" src={images[0]} alt={name}/>
                    </div>
                    
                    <div className='h-full flex flex-col flex-nowrap justify-between
                        items-start gap-1'>
                        <h4 className="text-3xl font-bold">{name}</h4>
                        <p className="text-lg ">{category}</p>
                        <span className="text-4xl">$ {price}</span>
                    </div>

                    <div className="h-full justify-self-center flex flex-col justify-center items-center
                        gap-2">
                        <p className='text-2xl'>Cantidad</p>
                        <div className='h-full flex flex-row flex-nowrap 
                        justify-center items-center gap-3'>
                            <IconButton onClick={()=>{
                                const productSent = {
                                    id: id,
                                    name: name,
                                    description: description, 
                                    category: category,
                                    price: price, 
                                    images: images, 
                                    quantity: quantity
                                }
                                console.log("product sent: ")
                                console.log(productSent)
                                cartContext.addProductCart(productSent, false)
                            }}>
                                <RemoveIcon  fontSize="large"/>
                            </IconButton>
                            <span className="text-2xl font-bold">{quantity}</span>
                            <IconButton onClick={()=>{
                                const productSent = {
                                    id: id,
                                    name: name,
                                    description: description, 
                                    category: category,
                                    price: price, 
                                    images: images, 
                                    quantity: quantity
                                }
                                console.log("product sent: ")
                                console.log(productSent)
                                cartContext.addProductCart(productSent, true)
                            }}>
                                <AddIcon fontSize="large"/>
                            </IconButton>
                            
                        </div>
                    </div>
                </>}
        </article>
    )
}

export default Item;