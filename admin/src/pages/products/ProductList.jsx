import './productsList.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { productsRows } from '../../dummyData'
import {Link} from 'react-router-dom'
import { useState } from 'react'

const ProductList = () => {
  const [data, setData] = useState(productsRows)
  
  function handleDelete(id)  {
      setData(data.filter((item) => item.id !== id))
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Product', width: 250, renderCell: (params)=>{
        return (
            <div className="productsListItem">
                <img className="productsListAvatar" src={params.row.img} alt="" />
                {params.row.name}
            </div>
        )
    } },
    { field: 'stock', headerName: 'Stock', width: 250 },
    {
    field: 'status',
    headerName: 'Status',
    width: 160,
    },
    {
    field: 'price',
    headerName: 'Price',
    width: 190,
    },
    {
    field: 'action',
    headerName: 'Action',
    width: 150, renderCell: (params) => {
        return (
        <>
            <Link to={'/products/'+params.row.id}>
                <button className='productsListButton'>Edit</button>
            </Link>
        </>
        )
    }
    },
    {
        field: 'delete',
        headerName: 'Delete',
        width: 150, renderCell: (params) => {
        return (
        <>
            <DeleteOutline className='productsListDelete' onClick={() => handleDelete(params.row.id)}/>
        </>)
        }
    }
];

  return (
    <div className='productsList'>
      <DataGrid rows={productsRows} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
    </div>
  )
}

export default ProductList