import {Link, useLocation} from 'react-router-dom'
import Chart from '../../components/chart/Chart'
import { Publish } from '@material-ui/icons'
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import "../../app.css"
import './product.css'

const Product = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [pStats, setStats] = useState([])
  const currentUser = useSelector((state) => state.user.currentUser)
  const item = useSelector((state) => state.product.list.find((product) => product._id === id))
  const months = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"],[])

  useEffect(() => {
    const BASE_URL = "http://localhost:3030/api"
    const localRequest = axios.create({
        baseURL: BASE_URL,
        headers: {token: `Bearer ${currentUser.accessTk}`}
    })
    const getStats = async () => {
      await localRequest.get("orders/income/sales?pid=" + id).then((res) => {
        const sortReturn = res.data.sort((a,b) => {
          return a._id - b._id
        })
        sortReturn.map((item) => {
          setStats(prev =>[
            ...prev,
            {name:months[item._id-1], "Sales": item.total}
          ])
        })
      }).catch((err) => {
        console.log(err)
      })
    };
    getStats();
  }, [id, months]);

  return (
    <div className="App"> 
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className='productPage'> 
          <div className="productTittleContainer">
            <h1 className="productTitle">Product</h1>
              <Link to="/newproduct">
                <button className="productAddButton">Create</button></Link>
          </div>
          <div className="productTop">
            <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title='Sales Performance' />
            </div>
            
            <div className="productTopRight">          
              <div className="productInfoTop">
                <img src={item.img} alt="" className="productInfoImg" />
                <span className="productName">{item.title}</span>
              </div>
              <div className="productInfoBottom">
                <div className='productInfoItem'>
                  <span className="productInfoKey">id: </span>
                  <span className="productInfoValue"> {item._id} </span>
                </div>
                <div className='productInfoItem'>
                  <span className="productInfoKey">Sales: </span>
                  <span className="productInfoValue">2000 </span>
                </div>
                <div className='productInfoItem'>
                  <span className="productInfoKey">Active: </span>
                  <span className="productInfoValue">{item.inStock ? 'yes' : 'no'} </span>
                </div>
                <div className='productInfoItem'>
                  <span className="productInfoKey">Stock: </span>
                  <span className="productInfoValue">{item.inStock} </span>
                </div>
                <div className='productInfoItem'>
                  <span className="productInfoKey">Price: </span>
                  <span className="productInfoValue">{item.price} </span>
                </div>
              </div>
            </div>
            
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                
                <label>Product Name: </label>
                <input type='text' placeholder={item.title}/>
                
                <label>Description: </label>
                <input type='text' placeholder={item.desc}/>
                
                <label>Price: </label>
                <input type='text' placeholder={item.price}/>
                
                <label>In Stock: </label>
                
                <select name='inStock' id='inStock'>
                  <option value='true' for='inStock'>Yes</option>
                  <option value='false' for='inStock'>No</option>
                </select>
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img src={item.img} alt="" className="productUploadImg" />
                  <label for='file'> 
                    <Publish />
                  </label>
                  <input type='file' id='file' style={{display:'none'}}/>
                </div>
                <button className="productButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product