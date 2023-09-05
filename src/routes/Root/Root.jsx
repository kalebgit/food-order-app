
//react
import {Outlet, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { ReactDOM } from 'react';
//components
import Navbar from '../../page/Navbar/Navbar'
import Effect from '../../page/Effect/Effect';
import AuthContext from '../../Contexts/AuthContext';

function Root(){
    //navegador
    const navigate = useNavigate();
    const [data, setData] = useState({isLoggedIn: true});

    const onLogout = ()=>{
        setData( (prevState)=>{
            return {isLoggedIn: false}
        })

        localStorage.removeItem('isLogged')
    }

    return (
        <>
            <AuthContext.Provider>

                <Navbar isAuthenticated={data.isLoggedIn} onLogout={onLogout}/>
                <Outlet context={[data, setData]}/>

            </AuthContext.Provider>

        </>
    )
}

export default Root;