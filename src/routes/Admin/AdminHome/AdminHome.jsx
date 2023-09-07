import Inventory2Icon from '@mui/icons-material/Inventory2';
import {Button, ButtonGroup} from '@mui/material'
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import {Outlet} from 'react-router-dom'
import Navicon from '../../../page/NavIcon/Navicon';
function AdminHome(){
    const [domReady, setDomReady] = useState(false)

    useEffect(() => {
        setDomReady(true)
    }, [])


    return (
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
    )
}

export default AdminHome;