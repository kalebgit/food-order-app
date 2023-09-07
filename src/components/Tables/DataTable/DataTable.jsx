import { IconButton } from "@mui/material";
import InformationRow from "../InformationRow/InformationRow";
import DeleteIcon from '@mui/icons-material/Delete';

function DataTable({title, data, onDeleteData}){

    

    const attributes = [];
    for(let attribute in data[0]){
        attributes.push(attribute);
    }

    attributes.push('delete');
    
    

    

    return(
        <>
            <table className=" w-full table-auto border border-collapse border-blue-800">
                <caption className=" text-xl font-bold mb-5 caption-top">{title}</caption>
                <thead className=" bg-sky-200">
                    <tr>
                        {attributes.map((element)=>{
                        return <th className="p-2 border border-slate-600"
                        key={element.id}>{element.toUpperCase()}</th>})}
                    </tr>    
                </thead>
                
                <tbody>
                    {data.map((element)=><InformationRow key={element.id} 
                    element={element}
                    extraRows={
                        [
                            <IconButton 
                            className=" mx-auto"
                            key="extra-row"
                            onClick={()=>{
                                onDeleteData(element.id)
                            }}>
                                <DeleteIcon fontSize="large"/>
                            </IconButton>
                        ]}
                    />)}
                    
                </tbody>
                
            </table>
        </>
        
        
    )
}

export default DataTable;