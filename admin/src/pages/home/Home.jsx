import Feature from '../../components/featuredInfo/Feature'
import Sidebar from "../../components/sidebar/Sidebar"
import { useEffect, useState, useMemo } from 'react'
import Topbar from "../../components/topbar/Topbar"
import { userRequest } from '../../requestMethods'
import Chart from '../../components/chart/Chart'
import { useSelector } from 'react-redux'
import "../../app.css"
import "./home.css"

const Home = () => {
  const [userStats, setUserStats] = useState([])
  const months = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"],[])
  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    const getStats = async () => {
      await userRequest.get('/users/stats').then((res) => {
        res.data.map((item) => {
          setUserStats((prev) =>[
            ...prev,
            {name:months[item._id-1], "Active User": item.total}
          ])
          return -1;
        })
      }).catch((err) => {
        console.log(err)
      })
    }
    getStats()
  },[months, currentUser])
  
  return (
    <>
    <Topbar />
    <div style={{display:'flex'}}>
    <Sidebar style={{marginTop:'0px'}}/>
        <div className='container-lg'>
            <Feature/>
            <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
        </div>
    </div>
    </>
  )
}

export default Home