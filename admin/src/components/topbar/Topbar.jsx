import React from 'react'
import './topbar.css'
import { 
    ExitToApp,
    PermIdentity,
    Storefront
} from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/userRedux'
import { useNavigate } from 'react-router'

function Topbar() {
    const currentUser = useSelector((state) => state.user.currentUser)
    const history = useNavigate()
    const dispatch = useDispatch()
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(logOut())
        history('/')
    }
    const content = (<>
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#fafafa', marginBottom:'0px'}}>
        <ul className="navbar-nav ml-left">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown" data-toggle="dropdown" href="/" role="button" aria-haspopup="false" aria-expanded="false">
                            <img src={currentUser.img} alt="" className="topAvatar" />
                        </a>
                        
                    </li>
                </ul>
            <a className="navbar-brand" href="/home"><h4 style={{color:'rgb(2, 65, 65)', fontWeight:'300'}}>Santa Colina</h4></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item" onClick={handleClick} style={{cursor:'pointer'}}>
                        <a className="nav-link">
                            <ExitToApp/> Logout
                        </a>
                    </li>
                </ul> 

            </div>
        </nav>
    </>)
    return content
}

export default Topbar