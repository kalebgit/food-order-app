
//react
import {Outlet} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { ReactDOM } from 'react';
//components
import Navbar from '../../page/Navbar/Navbar'
import Effect from '../../page/Effect/Effect';

import AuthContextProvider from '../../Contexts/Auth/AuthContextProvider';
import CartContextProvider from '../../Contexts/Cart/CartContextProvider';


function Root(){
    
    
    
    return (
        <>
            <AuthContextProvider>
                <CartContextProvider>
                    <Navbar/>
                    <Outlet/>
                </CartContextProvider>
            </AuthContextProvider>
                

            

        </>
    )
}

export default Root;