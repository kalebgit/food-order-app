


function StackContainer({className, vertical, horizontal, children}){
    return (
        <section className={`flex ${className} 
            ${horizontal && "flex-row "} 
            ${vertical && "flex-col "}`}>
            {children}
        </section>
    )
}

export default StackContainer