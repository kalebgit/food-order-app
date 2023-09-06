import Inventory2Icon from '@mui/icons-material/Inventory2';
import {Button, ButtonGroup} from '@mui/material'
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import {Outlet} from 'react-router-dom'
function AdminHome(){
    const [domReady, setDomReady] = useState(false)

    useEffect(() => {
        setDomReady(true)
    }, [])


    return (
        <main className="p-5 min-h-screen" id="admin-main">
            
            <h1 className="text-2xl font-bold text-center">Panel de Administrador</h1>

            <nav className=" border-b-2">
                <ButtonGroup variant="text" size="large">
                    <Button startIcon={<Inventory2Icon/>}
                        onClick="">
                        Inventario</Button>
                </ButtonGroup>
                
            </nav>

            <section className="py-5">
                    <Outlet/>
            </section>

            
        </main>
    )
}

export default AdminHome;