import './Effect.scss'

function Effect({blur, black}){
    return (
        <section className={`effect absolute w-screen h-screen top-0 left-0 ${blur ? 'effect__blur': ''} ${black ? 'effect__black': ''}`}></section>
    )
}

export default Effect;