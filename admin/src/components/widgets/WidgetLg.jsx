import'./widgetLg.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'
import axios from 'axios'

const WidgetLg = () => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const [orders, setOrders] = useState([])
    useEffect(() => {
      const BASE_URL = "http://localhost:3030/api"
      const localRequest = axios.create({
          baseURL: BASE_URL,
          headers: {token: `Bearer ${currentUser.accessTk}`}
      })
      const getOrders = async () => {
        await localRequest.get('/orders').then((res) => {
          setOrders(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }
      getOrders()
    },[])


    const Button = ({type}) => {
        return <button className={'widgetLgButton '+type}>{type}</button>
    }
    return (
    <div className='widgetLg'>
        <h3 className="widgetLgTitle">Latest Transactions</h3>
        <table className="widgetLgTable">
            <tr className="widgetLgTr">
                <th className="widgetLgTh">Customer</th>
                <th className="widgetLgTh">Date</th>
                <th className='widgetLgTh'>Hours</th>
                <th className="widgetLgTh">Amount</th>
                <th className="widgetLgTh">Status</th>
            </tr>
            {orders.map((order) => (
                <tr className="widgetLgTr" key={order._id}>
                    <td className="widgetLgUser">
                        <span className="widgetLgName">{order.userId}</span>
                    </td>
                    <td className="widgetLgDate">{dateFormat(order.createdAt, "mmmm dS, yyyy")}</td>
                    <td className="widgetLgDate">{dateFormat(order.createdAt, "h:MM:ss TT")}</td>
                    <td className="widgetLgAmount">${order.amount}</td>
                    <td className="widgetLgStatus"><Button type={order.status}/></td>
                </tr>
            ))}
    
        </table>
    </div>
  )
}

export default WidgetLg