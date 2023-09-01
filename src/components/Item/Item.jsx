
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import './Item.scss'

function Item({horizontal, vertical, product: {id, title, price, image}}){
    return (
        <article className="item h-96 p-4 flex flex-col justify-between items-stretch"
            style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`}}>
                <div>
                    <IconButton onClick>
                        <AddShoppingCartIcon fontSize='large'/>
                    </IconButton>
                    <IconButton onClick>
                        <FavoriteBorderIcon fontSize='large'/>
                    </IconButton>
                </div>

                <div className='flex flex-col flex-nowrap justify-start items-start gap-1'>
                    <h3 className="text-4xl text-white">title</h3>
                    <p className='text-2xl text-green-400'>price</p>
                    <div className=' text-lg text-gray-400 flex flex-row flex-wrap 
                        justify-start items-start divide-x-2 divide-gray-400'>
                        <p className="px-2 text-md">50 sell</p>
                        <p className="px-2 text-md">30 min</p>
                    </div>
                </div>
        </article>
    )
}

export default Item;