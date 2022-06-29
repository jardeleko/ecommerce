import Feature from '../../components/featuredInfo/Feature'
import WidgetSm from '../../components/widgets/WidgetSm'
import WidgetLg from '../../components/widgets/WidgetLg'
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import Chart from '../../components/chart/Chart'
import { useEffect, useState, useMemo } from 'react'
import "../../app.css"
import "./home.css"
import axios from 'axios'
import {useSelector} from 'react-redux'

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [userStats, setUserStats] = useState([])
  const months = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"],[])

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
    getStats()
  },[months, currentUser])

  return (
    <div className="App"> 
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className='home'>
            <Feature />
            <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
            <div className="homeWidgets">
              <WidgetSm />
              <WidgetLg />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home