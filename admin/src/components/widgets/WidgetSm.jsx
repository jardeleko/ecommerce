import { Visibility } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './widgetSm.css'

const WidgetSm = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [users, setUsers] = useState([])
  useEffect(() => {
    const BASE_URL = "http://localhost:3030/api"
    const localRequest = axios.create({
        baseURL: BASE_URL,
        headers: {token: `Bearer ${currentUser.accessTk}`}
    })
    const getUsers = async () => {
      await localRequest.get('/users/?new=true').then((res) => {
        setUsers(res.data)
      }).catch((err) => {
        console.log(err)
      })
    }
    getUsers()
  },[])

  return (
    <div className='widgetSm'>
      <span className="widgetSmTitle"> New Join Members</span>
        <ul className="widgetSmList">
          {users.map((user) => (
            <li className="widgetSmListItem" key={user._id}>
              <img src={user.img || "https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar.png"} className="widgetSmImg" />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.name} </span>
                <span className="widgetSmUserTitle">{user.email}</span>
              </div>
              <Link to={`/users/${user._id}`}><button className="widgetSmButton" ><Visibility className='widgetSmIcon'/> Display</button></Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WidgetSm