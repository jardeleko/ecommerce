import React from 'react'
import Chart from '../../components/chart/Chart'
import Feature from '../../components/featuredInfo/Feature'
import "./home.css"
import { userData } from '../../dummyData'
import WidgetSm from '../../components/widgets/WidgetSm'
import WidgetLg from '../../components/widgets/WidgetLg'

const Home = () => {
  return (
    <div className='home'>
        <Feature />
        <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
    </div>
  )
}

export default Home