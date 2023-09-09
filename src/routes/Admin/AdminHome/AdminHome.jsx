import Inventory2Icon from '@mui/icons-material/Inventory2';
import {Button, ButtonGroup} from '@mui/material'
import { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';

import {Outlet} from 'react-router-dom'
import Navicon from '../../../page/NavIcon/Navicon';
import AuthContext from '../../../Contexts/Auth/AuthContext';
function AdminHome(){

    const context = useContext(AuthContext);
    
    const [domReady, setDomReady] = useState(false)

    useEffect(() => {
        setDomReady(true)
    }, [])


    return (

        <>

        {context.isAdmin ? 
            <main className="p-5 min-h-screen flex flex-col gap-2" id="admin-main">
            
                <h1 className="text-4xl font-bold text-center">Panel de Administrador</h1>

                <nav className=" border-b-2">
                    <ButtonGroup variant="text" size="large">
                        <Navicon title="Inventario" startIcon={<Inventory2Icon/>}
                        path="/admin/product"/>
                    </ButtonGroup>
                    
                </nav>
                <Outlet/>
            </main>        
                
                : 
            <h1 className="text-center font-bold text-xl">No eres administrador</h1>
            }

        </>
        
        
    )
}

export default AdminHome;