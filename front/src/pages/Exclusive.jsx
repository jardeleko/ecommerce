import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'


const Exclusive = () => {
  const location = useLocation('')
  const currentUser = useSelector((state) => state.user.currentUser)
  const id = location.pathname.split("/")[2]
  const BASE_URL = "http://localhost:3030/api"
  const localRequest = axios.create({
      baseURL: BASE_URL,
      headers: {token: `Bearer ${currentUser.accessTk}`}
  }) 
  useEffect(() => {
    const userId = currentUser._id
    const result = {userId, productId:id}
    const createFav = async () => {
      await localRequest.post('/likes', result).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
    createFav()
  }, [currentUser, id])

  //
    window.history.back()    

}

export default Exclusive