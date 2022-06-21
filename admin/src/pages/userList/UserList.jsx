import './userList.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons';
import { userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const UserList = () => {
    const [data, setData] = useState(userRows)
   
    function handleDelete(id)  {
        
        setData(data.filter((item) => item.id !== id))
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'user', headerName: 'Username', width: 250, renderCell: (params)=>{
            return (
                <div className="userListUser">
                    <img className="userListAvatar" src={params.row.avatar} alt="user img" />
                    {params.row.username}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 250 },
        {
        field: 'status',
        headerName: 'Status',
        width: 160,
        },
        {
        field: 'transaction',
        headerName: 'Transaction Volume',
        width: 190,
        },
        {
        field: 'action',
        headerName: 'Action',
        width: 150, renderCell: (params) => {
            return (
            <>
                <Link to={'/users/'+params.row.id}>
                    <button className='userListButton'>Edit</button>
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
                <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row.id)}/>
            </>)
            }
        }
    ];
    
    return (
        <div className='userList'>
            <DataGrid rows={userRows} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
        </div>
    )
}

export default UserList