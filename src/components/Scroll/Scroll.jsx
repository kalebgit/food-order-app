

function Scroll({children, vertical, horizontal}){
    return (
        <section className={`px-8 flex ${horizontal && 
            'flex-row justify-start items-center'} `}>
            {children}
        </section>
    )
}

export default Scroll;