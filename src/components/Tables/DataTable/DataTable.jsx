import InformationRow from "../InformationRow/InformationRow";


function DataTable({title, data}){

    const attributes = data[0].getAttributeNames();

    return(
        <table>
            <caption>{title}</caption>
            <tr>
                {attributes.map((element)=>{<th>{element}</th>})}
            </tr>
            {data.map((element)=><InformationRow element={element}/>)}
        </table>
    )
}

export default DataTable;