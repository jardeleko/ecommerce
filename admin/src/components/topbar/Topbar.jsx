import React from 'react'
import './topbar.css'
import { Language, NotificationsNone, Settings } from '@material-ui/icons'

function Topbar() {
  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className='topLeft'>
                <span className="logo">Santa Colina</span>

            </div>
            <div className='topRight'>
                <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Settings />
                </div>
                <img src="https://avatars.githubusercontent.com/u/26754111?v=4" alt="" className="topAvatar" />
            </div>
        </div>    
    </div>
  )
}

export default Topbar