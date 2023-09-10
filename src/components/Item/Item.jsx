
import { IconButton, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import './Item.scss'
import { useEffect, useState } from 'react';

function Item({horizontal, vertical, product: {id, name, price, images}}){

    

    return (
        <article className="item h-96  p-4 rounded-md flex flex-col justify-between 
            items-stretch"
            style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), 
            rgba(0, 0, 0, 0.5)), url(${images[0]})`}}
            id={id}>
                <div>
                    <Tooltip title="Agregar al carrito">
                        <IconButton style={{color: 'green'}}>
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

                <div className='flex flex-col flex-nowrap justify-start items-start 
                        gap-1'>
                    <h3 className="text-4xl text-white">{name}</h3>
                    <p className='text-2xl text-green-400'>$ {price}</p>
                    <div className=' text-lg text-gray-400 flex flex-row flex-wrap 
                        justify-start items-start divide-x-2 divide-gray-400'>
                        <p className="px-2 text-md">[data]</p>
                        <p className="px-2 text-md">[data]</p>
                    </div>
                </div>
        </article>
    )
}

export default Item;