

function CirclesContainer({children}){
    return (
        <section className="md:py-5 md:px-10 grid md:grid-cols-5 md:grid-rows-2 grid-flow-col 
        md:max-h-80 gap-5">
            {children}
        </section>
    )
}

export default CirclesContainer;