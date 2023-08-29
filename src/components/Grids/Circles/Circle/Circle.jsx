import { Typography } from "@mui/material";

import './Circle.scss'

function Circle({img, title, price, expand, left, index, primary, secondary}){
    return (
        <article className={`circle h-full p-10 rounded-full flex flex-row flex-nowrap justify-between 
            items-center gap-3
            ${expand ? (left ? 'col-span-2' : `col-start-${index} col-end-${index+2}`) : '' }`}
            
            style={{backgroundColor: expand ? primary : secondary}}>
            <img {...img} className={`h-full object-contain${left ? 'order-1' : 'order-2'}`}/>
            <section className={`h-full md:p-10 rounded-full flex flex-col justify-center 
            items center ${left ? 'order-2' : `order-1`}`}
            style={{backgroundColor: expand ? secondary : primary}}>
                <p className="text-3xl font-bold">{title}</p>
                <p className="text-2xl">{price}</p>
            </section>
        </article>
    )
}

export default Circle;