import './Card.scss'

function Card({cardClassName, children, hasImage, image}){
    return (
        <section className={`card overflow-hidden rounded-lg w-full
            md:grid md:grid-cols-2 ${cardClassName}`}>
            {children}
            {hasImage &&

            <article className='hidden card__image 
                    md:flex md:flex-col md:justify-between
                    md:h-full md:bg-no-repeat md:bg-cover md:bg-center
                    md:p-4' 
                style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`}}>
                    <h2 className="text-white font-bold tracking-wide text-right
                        text-3xl">Titulo generico</h2>
                    <p className="text-white text-md">content</p>
            </article>
            }
        </section>
    )
}

export default Card;