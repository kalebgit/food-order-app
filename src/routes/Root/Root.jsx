
//react
import {Outlet} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { ReactDOM } from 'react';
//components
import Navbar from '../../page/Navbar/Navbar'
import Effect from '../../page/Effect/Effect';

import AuthContextProvider from '../../Contexts/Auth/AuthContextProvider';
import CartContextProvider from '../../Contexts/Cart/CartContextProvider';
import AdviceContextProvider from '../../Contexts/Advice/AdviceContextProvider';
import { ToastContainer } from 'react-toastify';


function Root(){
    
    
    
    return (
        <>
            <AuthContextProvider>
                <CartContextProvider>
                    <AdviceContextProvider>
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                        <Navbar/>
                        <Outlet/>
                    </AdviceContextProvider>
                </CartContextProvider>
            </AuthContextProvider>
                

            

        </>
    )
}

export default Root;