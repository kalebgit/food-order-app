

function Scroll({children, vertical, horizontal}){
    return (
        <section className={`px-8 flex ${horizontal && 
            'flex-row justify-start items-center'} gap-5 h-max`}>
            {children}
        </section>
    )
}

export default Scroll;