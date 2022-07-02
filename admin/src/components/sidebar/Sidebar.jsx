import React from 'react'
import "./sidebar.css"
import { Home, 
    AttachMoney,
    Timeline, 
    Storefront,
    Report,
    PermIdentity, 
    Dehaze,
    PersonAdd
} from '@material-ui/icons'
import { Link } from 'react-router-dom'


const Sidebar = () => {

    const content = (<>
    <div id="wrapper">
        <div id="sidebar-wrapper" style={{marginTop:'0px'}}>
            <ul className="sidebar-nav" style={{marginLeft:'0px'}}>
                <li className="sidebar-brand">
                    <a href="#menu-toggle"  id="menu-toggle" style={{marginTop:'20px', float:"right"}} > 
                        <i aria-hidden="true"><Dehaze style={{fontSize:'20px !important'}} aria-hidden="true" arial-hidden="true" /></i>  </a>
                </li><br />
                
                <li>
                    <a href="/home">  <i aria-hidden="true"><Home className='sidebarIcon' /> </i>  <span style={{marginLeft:'10px', marginTop:'20px'}}>Home</span>  </a>
                </li>
                <li>
                    <a href="/analytics">  <i aria-hidden="true"> <Timeline className='sidebarIcon' />  </i> <span style={{marginLeft:'10px'}}> New Users </span>  </a>
                </li>
                <li>
                    <a href="/users">  <i aria-hidden="true"><PermIdentity className='sidebarIcon' />  </i> <span style={{marginLeft:'10px'}}>Users</span>  </a>
                </li>
                <li>
                    <a href="/newuser">  <i aria-hidden="true"><PersonAdd className='sidebarIcon' />  </i> <span style={{marginLeft:'10px'}}>Cadaster</span>  </a>
                </li>
                <li>
                    <a href="/products">  <i aria-hidden="true"><Storefront className='sidebarIcon' />  </i> <span style={{marginLeft:'10px'}}>Products</span>  </a>
                </li>
                <li>
                    <a href="/transactions"> <i aria-hidden="true"> <AttachMoney className='sidebarIcon' /> </i>  <span style={{marginLeft:'10px'}}>Transactions</span>  </a>
                </li>
                <li>
                    <a href="/reports"> <i aria-hidden="true"><Report className='sidebarIcon' />  </i> <span style={{marginLeft:'10px'}}>Reports</span>  </a>
                </li>
            </ul>
        </div>
    </div>
    </>
    )
    const first = (<>
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to={'/home'} className='link'>
                            <li className="sidebarListItem ">
                                <Home className='sidebarIcon' /> Home                 
                            </li>
                        </Link>
                        <Link to={'/analytics'} className='link'>
                            <li className="sidebarListItem">
                                <Timeline className='sidebarIcon'/> New Users                     
                            </li>
                        </Link>
                    </ul>
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                    <Link to={'/users'} className='link'>
                        <li className="sidebarListItem">
                            <PermIdentity /> Users                  
                        </li>
                    </Link>
                    <Link to={'/products'} className='link'>
                        <li className="sidebarListItem">
                            <Storefront /> Products                    
                        </li>
                    </Link>
                    <Link to={'/transactions'} className='link'>
                        <li className="sidebarListItem">
                            <AttachMoney /> Transactions                    
                        </li>
                    </Link>
                    </ul>
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <Link to={'/reports'} className='link'>
                            <li className="sidebarListItem">
                                <Report /> Reports                    
                            </li>
                        </Link >
                    </ul>
                </div>
            </div>
        </div>
    </>)
    return content
}

export default Sidebar