import './product.css'
import {Link, useLocation} from 'react-router-dom'
import Chart from '../../components/chart/Chart'
import {productData} from '../../dummyData'
import {productsRows} from '../../dummyData'
import { Publish } from '@material-ui/icons'


const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  let item = productsRows.find((result) => {
    return String(result.id) === id
  })
  return (
    <div className='productPage'> 
      <div className="productTittleContainer">
        <h1 className="productTitle">Product</h1>
          <Link to="/newproduct">
            <button className="productAddButton">Create</button></Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title='Sales Performance' />
        </div>
        
        <div className="productTopRight">          
          <div className="productInfoTop">
            <img src={item.img} alt="" className="productInfoImg" />
            <span className="productName">{item.name}</span>
          </div>
          <div className="productInfoBottom">
            <div className='productInfoItem'>
              <span className="productInfoKey">id: </span>
              <span className="productInfoValue">{item.id} </span>
            </div>
            <div className='productInfoItem'>
              <span className="productInfoKey">Sales: </span>
              <span className="productInfoValue">2000 </span>
            </div>
            <div className='productInfoItem'>
              <span className="productInfoKey">Active: </span>
              <span className="productInfoValue">{item.stock >= 0 ? 'yes' : 'no'} </span>
            </div>
            <div className='productInfoItem'>
              <span className="productInfoKey">Stock: </span>
              <span className="productInfoValue">{item.stock} </span>
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
            <input type='text' placeholder={item.name}/>
            <label>In Stock: </label>
            <select name='inStock' id='inStock'>
              <option value='yes' for='inStock'>Yes</option>
              <option value='no' for='inStock'>No</option>
            </select>
            <label>Active: </label>
            <select name='active' id='active'>
              <option value='yes' for='active'>Yes</option>
              <option value='no' for='active'>No</option>
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
  )
}

export default Product