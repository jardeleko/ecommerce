import Feature from '../../components/featuredInfo/Feature'
import Sidebar from "../../components/sidebar/Sidebar"
import { useEffect, useState, useMemo } from 'react'
import Topbar from "../../components/topbar/Topbar"
import Chart from '../../components/chart/Chart'
import { useSelector } from 'react-redux'
import axios from 'axios'
import "../../app.css"
import "./home.css"

const Home = () => {
  const [userStats, setUserStats] = useState([])
  const months = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"],[])
  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    const BASE_URL = "http://localhost:3030/api"
    const localRequest = axios.create({
        baseURL: BASE_URL,
        headers: {token: `Bearer ${currentUser.accessTk}`}
    })
    const getStats = async () => {
      await localRequest.get('/users/stats').then((res) => {
        const sortedReturn = res.data.sort(function(a, b){return a._id - b._id});
        sortedReturn.map((item) => {
          setUserStats(prev =>[
            ...prev,
            {name:months[item._id-1], "Active User": item.total}
          ])
        })
      }).catch((err) => {
        console.log(err)
      })
    }
    getStats(userStats)
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