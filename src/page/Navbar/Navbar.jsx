
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LogoutIcon from '@mui/icons-material/Logout';
//react
import {useState} from 'react'
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom'



//mycomponents
import NavLinksContainer from '../NavLinksContainer/NavLinksContainer';
import './Navbar.scss'
import Effect from '../Effect/Effect';
import { LogoutOutlined } from '@mui/icons-material';




function Navbar({isAuthenticated, onLogout}){
    

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

    return (
        <header className=" bg-white">
            {isAuthenticated &&
            <section className="relative flex flex-row flex-nowrap justify-between p-3">

                <section>
                    <Tooltip title="options" arrow>
                        <IconButton onClick={onClickOptions}>
                            <MenuIcon fontSize='large' />
                        </IconButton>
                    </Tooltip>
                </section>

                <section>
                    <Tooltip title="cart" arrow>
                        <IconButton onClick={()=>{}}>
                            <ShoppingCartIcon fontSize='large'/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="account" arrow>
                        <IconButton onClick={onClickSubMenuAccount}>
                            <AccountBoxIcon fontSize='large'/> 
                        </IconButton>
                    </Tooltip>
                    
                    <div className={`sub-menu absolute rounded-b-md right-0 bg-white ${showAccountMenu ? 
                    'sub-menu__show' : ''}`}>
                        <NavLinksContainer>
                            <Button endIcon={<LogoutIcon/>} 
                                onClick={onLogout}>Cerrar Sesion</Button>
                        </NavLinksContainer>
                    </div>
                    
                    
                </section>
            
            </section>  
            }
            <nav className={`navbar absolute top-0 w-1/4 h-full rounded-e-md bg-white p-2 divide-y ${showNavbar ? 'navbar__show': ''}`}>
                <section className="flex flex-row flex-nowrap justify-between items-center ">
                    <IconButton>
                        <LogoDevIcon/>
                    </IconButton>
                    <IconButton onClick={onClickOptions}>
                        <CloseIcon/>
                    </IconButton>
                </section>
                <NavLinksContainer>
                    <Link to="/home" className="w-full">
                        <Button variant="text" startIcon={<HomeIcon/>}
                        className='w-full' >Home</Button>
                    </Link>
                    
                    <Link to="" className="w-full">
                        <Button variant="text" startIcon={<WhatshotIcon/>}
                        className='w-full' >Trend</Button>
                    </Link>

                    <Link to="" className="w-full">
                        <Button variant="text" startIcon={<QueryStatsIcon/>}
                        className='w-full' >Stats</Button>
                    </Link>
                </NavLinksContainer>
                <section >
                    
                </section>
            </nav>

            {showNavbar && 
            ReactDOM.createPortal(<Effect blur/>, document.getElementById('backdrop-root'))
            }
        </header>
    )
}

export default Navbar;