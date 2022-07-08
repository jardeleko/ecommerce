import { publicRequest } from '../../requestMethods'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import { useEffect } from 'react'
import { useState } from 'react'
import "./report.css"

const Report = () => {
  const [reports, setReports] = useState([])
  
  useEffect(() => {
    const getReports = async () => {
      await publicRequest.get('/reports/find').then((res) => {
        console.log(res.data)
        setReports(res.data)
      }).catch((err) => {
        console.log(err)
      })
    }
    getReports()
  },[])

  const content = (<>
    <div className="container">
      <div className="row">  
          {reports?.map((item) => (
            <div className="card-big-shadow">
                <div className="card card-just-text" data-background="color" data-color="blue" data-radius="none">
                    <div className="content">
                        <h4 className="category">{item.orderId}</h4>
                        <h6 className="title">{item.email}</h6>
                        <p className="description">{item.message}.</p>
                    </div>
                </div> 
            </div>
          ))}
        </div>
      </div>    
  </>)

  return (<>
      <Topbar />
        <div style={{display:'flex'}}>
            <Sidebar />
            <div className="container p-3 my-3">
              {content}
            </div>
        </div>
    </>)
}

export default Report