

function CirclesContainer({children}){
    return (
        <section className="md:py-5 md:px-10 grid md:grid-cols-5 md:grid-rows-2 md:max-h-80">
            {children}
        </section>
    )
}

export default CirclesContainer;