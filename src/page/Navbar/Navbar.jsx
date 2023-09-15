
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, IconButton, Toolbar, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import Navicon from '../NavIcon/Navicon';
//react
import {useState, useContext} from 'react'

import ReactDOM from 'react-dom'



//mycomponents
import NavLinksContainer from '../NavLinksContainer/NavLinksContainer';
import './Navbar.scss'
import Effect from '../Effect/Effect';
import { LogoutOutlined } from '@mui/icons-material';
import AuthContext from '../../Contexts/Auth/AuthContext';
import { Link } from 'react-router-dom';
import CartContext from '../../Contexts/Cart/CartContext';





function Navbar({}){
    const authContext = useContext(AuthContext)
    const cartContext = useContext(CartContext)

    //show states
    const [showNavbar, setShowNavbar] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);


    //cambia la presentacion del navbar
    const onClickOptions = ()=>{
        setShowNavbar((prevState)=>!prevState);
    }

    //renderiza el sub menu
    const onClickSubMenuAccount = ()=>{
        setShowAccountMenu((prevState)=>!prevState);
    }

    //cuando clickea una pagina
    const onClickToPage = ()=>{
        setShowNavbar(false);
    }

    return (
        <header className=" bg-white">
            {authContext.isLoggedIn &&
            <section className="relative flex flex-row flex-nowrap justify-between 
            p-3">

                <section>
                    <Tooltip title="options" arrow>
                        <IconButton onClick={onClickOptions}>
                            <MenuIcon fontSize='large' />
                        </IconButton>
                    </Tooltip>
                </section>

                <section>
                    <Tooltip title="cart" arrow>
                        <Badge badgeContent={cartContext.cart && 
                        cartContext.cart.length}
                            invisible={cartContext.cart && 
                            cartContext.cart.length == 0}
                        color="primary">
                            <Link to="/cart">
                                <IconButton>
                                    <ShoppingCartIcon fontSize='large'/>
                                </IconButton>
                            </Link>
                        </Badge>
                    </Tooltip>
                    <Tooltip title="account" arrow>
                        <IconButton onClick={onClickSubMenuAccount}>
                            <AccountBoxIcon fontSize='large'/> 
                        </IconButton>
                    </Tooltip>
                    
                    <div className={`sub-menu absolute rounded-b-md right-0 
                    bg-white ${showAccountMenu ? 
                    'sub-menu__show' : ''}`}>
                        <NavLinksContainer>
                            <Button endIcon={<LogoutIcon/>} 
                                onClick={authContext.logout}>Cerrar Sesion</Button>
                        </NavLinksContainer>
                    </div>
                    
                    
                </section>
            
            </section>  
            }
            <nav className={`navbar absolute top-0 w-1/4 h-full rounded-e-md 
                bg-white p-2 divide-y ${showNavbar ? 'navbar__show': ''}`}>
                <section className="flex flex-row flex-nowrap justify-between 
                items-center ">
                    <IconButton>
                        <LogoDevIcon/>
                    </IconButton>
                    <IconButton onClick={onClickOptions}>
                        <CloseIcon/>
                    </IconButton>
                </section>
                <NavLinksContainer>

                    <Navicon title="home" onClick={onClickToPage} 
                        startIcon={<HomeIcon/>} 
                        path="/home"/>
                    <Navicon title="trend" onClick={onClickToPage} 
                        startIcon={<WhatshotIcon/>}/>
                    <Navicon title="stats" onClick={onClickToPage} 
                        startIcon={<QueryStatsIcon/>}/>

                    {authContext.isAdmin &&
                    <Navicon title="admin" onClick={onClickToPage} 
                        startIcon={<AdminPanelSettingsIcon/>}
                        path="/admin"/>}

                </NavLinksContainer>
                <section >
                    
                </section>
            </nav>

            {showNavbar && 
            ReactDOM.createPortal(<Effect blur/>, 
                document.getElementById('backdrop-root'))
            }
        </header>
    )
}

export default Navbar;