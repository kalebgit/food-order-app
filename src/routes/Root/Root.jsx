
//react
import {Outlet} from 'react-router-dom'
import {useState} from 'react'

//components
import Navbar from '../../page/Navbar/Navbar'

function Root(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = (email, password) => {
      // We should of course check email and password
      // But it's just a dummy/ demo anyways
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        setIsLoggedIn(false);
    };

    return (
        <>
            <Navbar isAuthenticated={true}/>
            <Outlet/>
        </>
    )
}

export default Root;