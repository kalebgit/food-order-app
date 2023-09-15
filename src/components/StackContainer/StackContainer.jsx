


function StackContainer({className, vertical, horizontal, children}){
    return (
        <section className={`flex ${className} 
            ${horizontal && "flex-row "} 
            ${vertical && "flex-col gap-7 px-4"}`}>
            {children}
        </section>
    )
}

export default StackContainer