


function InformationRow({element}){

    const getAttributes = ()=>{
        const array = [];
        for(attribute in element){
            array.push(attribute);
        }
        return array;
    }
    return (
        <tr>
            {getAttributes().map((attribute)=>{<td>{attribute}</td>})}
        </tr>
    )
}

export default InformationRow;