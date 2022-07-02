import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'

const RemoveItem = () => {
  const location = useLocation('')
  const id = location.pathname.split("/")[2]
  const currentUser = useSelector((state) => state.user.currentUser)

  const BASE_URL = "http://localhost:3030/api"
  const localRequest = axios.create({
      baseURL: BASE_URL,
      headers: {token: `Bearer ${currentUser.accessTk}`}
  }) 

  async function reqAndRemove(itemDelete){
    const aux = itemDelete[0]._id
    console.log(aux)
    await localRequest.delete(`/likes/${aux}`).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    const reqList = async () => {
      await localRequest.get(`/likes/find/${currentUser._id}`).then( async(res) => {
        const itemDelete = res.data.filter((item) => item.productId === id)
        reqAndRemove(itemDelete)
      }).catch((err) => {
        console.log(err)
      })
    }
    reqList()
  }, [currentUser, reqAndRemove, id])

  setTimeout(() => {
    window.history.back() 
  }, 500);
   

}

export default RemoveItem