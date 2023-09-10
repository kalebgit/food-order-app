import ProgressCheckpoint from "./ProgressCheckpoint";




function ProgressBar({checkpoints}){
    return (
        <article className=" w-full h-max flex flex-row justify-center items-center
                bg-amber-100">
            {checkpoints.map((element)=>{return <ProgressCheckpoint title={element}/>})}
        </article>
    )
}

export default ProgressBar;