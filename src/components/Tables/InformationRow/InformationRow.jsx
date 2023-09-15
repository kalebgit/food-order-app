


function InformationRow({element, extraRows}){

    const getAttributes = ()=>{
        const array = [];
        console.log(element);
        for(let attribute in element){
            array.push(element[attribute]);
        }
        console.log(array);
        return array;
    }
    return (
        <tr>
            {getAttributes().map((attribute, index)=>{
            return <td className=" text-center border border-slate-600"
                key={index}>{attribute}</td>})}
            {extraRows}
            
        </tr>
    )
}

export default InformationRow;