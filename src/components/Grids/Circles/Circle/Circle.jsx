import { Typography } from "@mui/material";

import './Circle.scss'
import { useState } from "react";

function Circle({img, title, price, left, index, primary, secondary}){

    const [expand, setExpand] = useState(false);

    const onClick = ()=>{
        setExpand((prevState)=>!prevState);
    }

    return (
        <article className={`circle h-full p-10 rounded-full flex flex-row flex-nowrap justify-between 
            items-center gap-3
            ${expand ? (left ? 'col-span-2' : `col-start-${index} col-end-${index+2}`) : '' } `}
            onClick={onClick}
            style={{backgroundColor: expand ? primary : secondary, transition: '.7s'}}>
            <img {...img} className={`h-full object-contain${left ? 'order-1' : 'order-2'}`}/>

            <section className={`h-full  rounded-full flex flex-col justify-center 
            items center ${left ? 'order-2' : `order-1`} ${expand ? ' md:w-80 md:p-10' : ' w-0'} 
            overflow-hidden`}
            style={{backgroundColor: expand ? secondary : primary, transition: '.7s'}}>
                <p className="text-3xl font-bold">{title}</p>
                <p className="text-2xl">{price}</p>
            </section>

            
        </article>
    )
}

export default Circle;