
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar, Tooltip } from '@mui/material';


//react
import {useState} from 'react'
function Navbar({isAuthenticated}){
    
    const [isExpanded, setIsExpanded] = useState(false);

    const onClickOptions = ()=>{

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
            <nav className=" w-1/5 bg-white">
                <section>

                </section>
                <section>

                </section>
            </nav>
        </header>
    )
}

export default Navbar;