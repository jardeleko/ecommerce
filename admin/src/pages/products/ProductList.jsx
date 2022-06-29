import './productsList.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import "../../app.css"
import { deleteProduct, getProducts } from '../../redux/apiCalls'


const ProductList = () => {
  const products = useSelector((state) => state.product.list)
  const dispatch = useDispatch()
  useEffect(() => {
    getProducts(dispatch)
  }, [])
  function handleDelete(id) {
    deleteProduct(id, dispatch)
  }
  const columns = [
    { field: '_id', 
        headerName: 'ID', 
        width: 222 
    },
    { field: 'name', 
        headerName: 'Product Name', 
        width: 450, 
        renderCell: (params)=>{ return (
            <div className="productsListItem">
                <img className="productsListAvatar" src={params.row.img} alt="" />
                {params.row.title}
            </div>
            )
        } 
    },
    {   
        field: 'inStock', 
        headerName: 'Stock', 
        width: 150 
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 150,
    },
    {
        field: 'action',
        headerName: 'Action',
        width: 150, 
        renderCell: (params) => { return ( <>
            <Link to={'/products/'+params.row._id}>
                <button className='productsListButton'>Edit</button>
            </Link></>
        )}
    },
    {
        field: 'delete',
        headerName: 'Delete',
        width: 150, 
        renderCell: (params) => {return (<>
            <DeleteOutline className='productsListDelete' onClick={() => handleDelete(params.row._id)}/></>
        )}
    }
];

  return (
    <div className="App"> 
        <Topbar />
        <div className="container">
            <Sidebar />
            <div className='productsList'>
            <DataGrid 
                rows={products} 
                disableSelectionOnClick 
                columns={columns} 
                getRowId={(row) => row._id}
                pageSize={10} 
                checkboxSelection 
            />
            </div>
        </div>
    </div>
  )
}

export default ProductList