import { Visibility } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userRequest } from '../../requestMethods'

import './widgetSm.css'

const WidgetSm = () => {
  
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      await userRequest.get('/users/?new=true').then((res) => {
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
              <img src={user.img} className="widgetSmImg"  alt="user pic" />
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