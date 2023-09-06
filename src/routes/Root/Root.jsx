
//react
import {Outlet} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { ReactDOM } from 'react';
//components
import Navbar from '../../page/Navbar/Navbar'
import Effect from '../../page/Effect/Effect';
import AuthContext from '../../Contexts/AuthContext';

function Root(){
    const [data, setData] = useState({isLoggedIn: false});

    return (
        <>
            <AuthContext.Provider value={{
                isLoggedIn: data.isLoggedIn,
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