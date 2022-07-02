import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import Sidebar from "../../components/sidebar/Sidebar"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { updateProduct } from "../../redux/apiCalls"
import Topbar from "../../components/topbar/Topbar"
import {Link, useLocation} from 'react-router-dom'
import Chart from '../../components/chart/Chart'
import { Publish } from "@material-ui/icons"
import app from '../../firebase'
import axios from 'axios'
import "../../app.css"
import './product.css'


const Product = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const currentUser = useSelector((state) => state.user.currentUser)
  const [pStats, setStats] = useState([])
  const [file, setFile] = useState(null)
  const [inputs, setInputs] = useState({})
  const dispatch = useDispatch()
  const item = useSelector((state) => state.product.list.find((product) => product._id === id))
  const months = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"],[])
  
  const handleChange = (e) => {
    e.preventDefault()
    setInputs(prev => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(file === null){         
        updateProduct(id, inputs, dispatch)
    }
    else {
      const fileName = new Date().getTime() + file.name 
      const storage = getStorage(app) 
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            // ...
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { 
              const result = {...inputs, img:downloadURL }
            updateProduct(id, result, dispatch)
          });
        }
      );
    }
  }
  
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

  return (<>
    <Topbar />
    <div style={{display:'flex'}}>
      <Sidebar />
      <div className="container-lg mt-3 ">
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
          </div>
          <div className="productTop">
            <div className="productTopRight">          
              <div className="productInfoTop">
                <img src={item.img} alt="" className="productInfoImg" />
                <span className="productName"> {item.title} </span>
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
                <input type='text' name='title' onChange={handleChange} placeholder={item.title}/>
                
                <label>Description: </label>
                <input type='text' name='desc' onChange={handleChange} placeholder={item.desc}/>
                
                <label>Price: </label>
                <input type='text' name='price' onChange={handleChange} placeholder={item.price}/>
          
                <label>In Stock: </label>      
                <select name='inStock' id='inStock' onChange={handleChange}>
                <option value='false' for='inStock' selected>Select</option>
                  <option value='true' for='inStock'>Yes</option>
                  <option value='false' for='inStock'>No</option>
                </select>
              </div>
              <div className="productFormRight">
                <div className="productUpdateUpload">
                    <img src={item.img}
                    alt="update profile" className="productUploadImg" />
                    <label htmlFor='file'><Publish className='updateIcon' /></label>
                    <input type="file" id="file" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <button className="productButton" onClick={handleSubmit}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Product