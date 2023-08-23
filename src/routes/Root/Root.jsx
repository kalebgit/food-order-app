
//react
import {Outlet} from 'react-router-dom'
import {useState} from 'react'
import { ReactDOM } from 'react';
//components
import Navbar from '../../page/Navbar/Navbar'
import Effect from '../../page/Effect/Effect';

function Root(){
    const [data, setData] = useState({isLoggedIn: false});

    return (
        <>
            <Navbar isAuthenticated={data.isLoggedIn}/>
            <Outlet context={[data, setData]}/>
        </>
    )
}

export default Root;