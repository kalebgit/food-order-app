
//react
import {Outlet} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { ReactDOM } from 'react';
//components
import Navbar from '../../page/Navbar/Navbar'
import Effect from '../../page/Effect/Effect';

import AuthContextProvider from '../../Contexts/Auth/AuthContextProvider';


function Root(){
    
    
    
    return (
        <>
            <AuthContextProvider>

                <Navbar/>
                <Outlet/>

            </AuthContextProvider>
                

            

        </>
    )
}

export default Root;