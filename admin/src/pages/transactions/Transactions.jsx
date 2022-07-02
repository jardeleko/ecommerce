import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import WidgetLg from '../../components/widgets/WidgetLg'

const Transactions = () => {
  return (<>
    <Topbar />
      <div style={{display:'flex'}}>
      <Sidebar />
        <div className="container p-3 my-3" >
          <WidgetLg />
        </div>
    </div>
  </>)
}

export default Transactions