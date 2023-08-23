
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
//react
import {useState} from 'react'
import {Link} from 'react-router-dom'

//mycomponents
import NavLinksContainer from '../NavLinksContainer/NavLinksContainer';

import './Navbar.scss'
function Navbar({isAuthenticated}){
    
    const [showNavbar, setShowNavbar] = useState(false);

    const onClickOptions = ()=>{
        setShowNavbar((prevState)=>!prevState);
    }

    return (
        <header className="stick bg-white border-b-blue-200">
            {isAuthenticated &&
            <section className="flex flex-row flex-nowrap justify-between p-3">

                <div>
                    <Tooltip title="options" arrow>
                        <IconButton onClick={onClickOptions}>
                            <MenuIcon fontSize='large' />
                        </IconButton>
                    </Tooltip>
                </div>

                <div>
                    <Tooltip title="cart" arrow>
                        <IconButton onClick={()=>{}}>
                            <ShoppingCartIcon fontSize='large'/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="account" arrow>
                        <IconButton onClick={()=>{}}>
                            <AccountBoxIcon fontSize='large'/> 
                        </IconButton>
                    </Tooltip>
                    
                    
                </div>
            
            </section>  
            }
            <nav className={`navbar absolute top-0 w-1/4 h-full bg-white p-2 z-30 divide-y ${showNavbar ? 'navbar__show': ''}`}>
                <section className="flex flex-row flex-nowrap justify-between items-center ">
                    <IconButton>
                        <LogoDevIcon/>
                    </IconButton>
                    <IconButton onClick={onClickOptions}>
                        <CloseIcon/>
                    </IconButton>
                </section>
                <NavLinksContainer>
                    <Link to="" className="w-full">
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
        </header>
    )
}

export default Navbar;