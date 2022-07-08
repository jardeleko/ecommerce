import { deleteProduct, getProducts } from '../../redux/apiCalls'
import Sidebar from "../../components/sidebar/Sidebar"
import { useDispatch, useSelector} from 'react-redux'
import Topbar from "../../components/topbar/Topbar"
import { DeleteOutline } from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import './productsList.css'
import "../../app.css"


const ProductList = () => {
  const products = useSelector((state) => state.product.list)
  const dispatch = useDispatch()
  
  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])
  
  function handleDelete(id) {
    deleteProduct(id, dispatch)
  }
  
  const columns = [
    { field: '_id', 
        headerName: 'ID', 
        width: 200 
    },
    { field: 'name', 
        headerName: 'Product Name', 
        width: 250, 
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
                <button className='btn btn-primary' style={{backgroundColor: "rgb(2, 65, 65)", border:'none'}}>Edit</button>
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

  return (<>
    <Topbar />
    <div style={{display:'flex'}}>
    <Sidebar />
        <div className="container " style={{marginTop:'30px'}}>
        <DataGrid 
            rows={products} 
            disableSelectionOnClick 
            columns={columns} 
            getRowId={(row) => row._id}
            pageSize={10} 
            autoHeight={true}
            hideFooter={false}
            checkboxSelection 
        />
        </div>
    </div>
    </>)
}

export default ProductList