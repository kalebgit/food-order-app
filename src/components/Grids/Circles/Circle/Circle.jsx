import { Typography } from "@mui/material";



function Circle({img, title, price, expand, left, index, primary, secondary}){
    return (
        <article className={`rounded-full flex flex-row flex-nowrap justify-between items-center 
            ${expand ? (left ? 'row-span-2' : `row-start-${index} row-end-${index+2}`) : '' }`}>
            <img {...img} className={`${left ? 'order-1' : 'order-2'}`}/>
            <section className={`${left ? 'order-2' : `order-1`}`}>
                <Typography variant="h4">{title}</Typography>
                <Typography variant="h5">{price}</Typography>
            </section>
        </article>
    )
}

export default Circle;