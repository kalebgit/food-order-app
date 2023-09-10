
import './Scroll.scss'

function Scroll({children, vertical, horizontal}){
    return (
        <section className={`relative scroll-visible w-full h-max gap-5`}>
            {children}
        </section>
    )
}

export default Scroll;