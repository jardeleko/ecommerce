import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import WidgetSm from '../../components/widgets/WidgetSm'

const Analytics = () => {
  
  return (<>
    <Topbar />
      <div style={{display:'flex'}}>
      <Sidebar />
          <div className='container-lg'>
            <div className="homeWidgets">
              <WidgetSm style={{flex:'4'}}/>
            </div>
          </div>
      </div>
  </>)
}

export default Analytics