

function Scroll({children, vertical, horizontal}){
    return (
        <section className={` flex ${horizontal && 'flex-row'} `}>
            {children}
        </section>
    )
}

export default Scroll;