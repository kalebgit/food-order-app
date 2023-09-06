
//react
import {Outlet} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { ReactDOM } from 'react';
//components
import Navbar from '../../page/Navbar/Navbar'
import Effect from '../../page/Effect/Effect';
import AuthContext from '../../Contexts/AuthContext';
import { db } from '../../config/firebase';

function Root(){
    const [data, setData] = useState({isLoggedIn: true, isAdmin: true});

    return (
        <>
            <AuthContext.Provider value={{
                isLoggedIn: data.isLoggedIn,
                isAdmin: data.isAdmin,
                onChangeLogged: ()=>{
                        console.log("prevState changed")
                        setData( (prevState)=>{
                            return {isLoggedIn: !prevState.isLoggedIn}
                        })
                    }   
                }}>

                <Navbar/>
                <Outlet/>

            </AuthContext.Provider>

        </>
    )
}

export default Root;