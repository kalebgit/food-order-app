
//react
import {Outlet} from 'react-router-dom'
import {useState} from 'react'
import { ReactDOM } from 'react';
//components
import Navbar from '../../page/Navbar/Navbar'
import Effect from '../../page/Effect/Effect';

function Root(){
    const [data, setData] = useState({isLoggedIn: false});

    const onLogout = ()=>{
        setData( (prevState)=>{
            return {isLoggedIn: false}
        })

        localStorage.removeItem('isLogged')
    }

    return (
        <>
            <Navbar isAuthenticated={data.isLoggedIn} onLogout={onLogout}/>
            <Outlet context={[data, setData]}/>
        </>
    )
}

export default Root;