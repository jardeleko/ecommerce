import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

const Orders = () => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const [orders, setOrders] = useState("")
    useEffect(()  => {
        const BASE_URL = "http://localhost:3030/api"
        const localRequest = axios.create({
            baseURL: BASE_URL,
            headers: {token: `Bearer ${currentUser.accessTk}`},
        })
        const getOrder = async () => {
          await localRequest.get(`/orders/find/${currentUser._id}`).then((res) => {
            setOrders(res.data)  
            }).catch((err) => {
              console.log("error order"+err);
            })
        };
        getOrder();
      }, [ currentUser]);

    const content = (        
        <><ul>
            {orders.length !== 0
            ?
            orders.map((ord) => (
            <li key={ord._id}>
                <hr style={{width:'50%',textAlign:'left', marginLeft:'0'}}/>
                    <div className="container-fluid">
                        <div className="container">
                            <div className="container">
                                <fieldset>
                                    <div className="col-md-12">
                                        <div>
                                            <h5 style={{fontWeight:'bold'}}>Client: {currentUser.name}</h5>
                                            <span>Created: {dateFormat(ord.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span><br/>
                                            <span>Order id: {ord._id}</span>
                                        </div><br/>
                                        <h5 style={{fontWeight:'bold'}}>Products:</h5>{ord.products.map((item) => (
                                            <div>
                                                <span>Product: {item.productName}</span><br/>    
                                                <span>Quantity: {item.quantity}</span>
                                            </div>
                                        ))}
                                        <br />
                                        <div className="valid-feedback"></div>
                                        <div className="invalid-feedback">Username field cannot be blank!</div>
                                    </div>
                                    <div className="col-md-12">
                                        <h5 style={{fontWeight:'bold'}}>Adress:</h5>
                                            <div>
                                                <span>Street: {ord.address.line1}</span><br/>
                                                <span>postal: {ord.address.postal_code}</span><br/>
                                                <span>city: {ord.address.city}</span><br/>
                                                <span>country: {ord.address.country}</span><br/>
                                                <span>your product arrive in maximum 15 days</span><br/>

                                            </div>
                                    </div>
                
                                <div className="form-button mt-3">
                                    <button className="btn btn-warning" disabled style={{margin:'10px'}}>Status {ord.status}</button>
                                </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <hr style={{width:'50%',textAlign:'left', marginLeft:'0'}}/>
            </li>
        ))
    : <h4 style={{textAlign:'center', margin:'300px'}}>you dont have orders, buy now!</h4>
    }</ul></>
        )  
  return (
    <div>
        <Navbar />
        {content}
        <Footer />
    </div>
  )
}

export default Orders