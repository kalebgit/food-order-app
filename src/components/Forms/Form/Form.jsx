import './Form.scss'

function Form({title, children, className}){
    return (
        <form className={`form rounded-lg p-5 flex flex-col flex-nowrap justify-start 
        items-center gap-8 ${className}`}>
            <legend className="font-bold text-xl">{title}</legend>
            <fieldset className="flex flex-col flex-nowrap justify-start items-start gap-4">
                {children}
            </fieldset>
        </form>
    )
}

export default Form;