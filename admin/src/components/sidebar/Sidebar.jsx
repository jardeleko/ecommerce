import React from 'react'
import "./sidebar.css"
import { Home, 
    AttachMoney,
    Timeline, 
    TrendingUp,
    Storefront,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
    PermIdentity,
    ExitToApp
} from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/userRedux'
import { useNavigate } from 'react-router'

const Sidebar = () => {
    const history = useNavigate()
    const dispatch = useDispatch()
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(logOut())
        history('/')
    }
    return (
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
                        <li className="sidebarListItem">
                            <Timeline className='sidebarIcon'/> Analytics                    
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className='sidebarIcon'/> Sales                    
                        </li>
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
                        <li className="sidebarListItem">
                            <AttachMoney /> Transactions                    
                        </li>
                        <li className="sidebarListItem">
                            <BarChart /> Reports                    
                        </li>

                    </ul>
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <MailOutline className='sidebarIcon' />  Mail                
                        </li>
                        <li className="sidebarListItem">
                            <DynamicFeed className='sidebarIcon'/> Feedback                    
                        </li>
                        <li className="sidebarListItem">
                            <ChatBubbleOutline className='sidebarIcon'/> Messages                    
                        </li>
                    </ul>
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <WorkOutline />  Manage                
                        </li>
                        <li className="sidebarListItem">
                            <Timeline /> Analytics                    
                        </li>
                        <li className="sidebarListItem">
                            <Report /> Reports                    
                        </li>
                        <li className="sidebarListItem" onClick={handleClick}>
                            <ExitToApp  /> Logout
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar