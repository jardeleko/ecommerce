import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { userRequest } from "../../requestMethods"
import { DeleteOutline } from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import './userList.css'
import "../../app.css"


const UserList = () => {
    const [users, setUsers] = useState([])
    
    async function handleDelete(id) {
        await userRequest.delete(`/users/${id}`).then((res) => {
            console.log(res.data)
            window.location.reload(true)        
        }).catch((err) => {
            console.log(err)
        })
      }
    useEffect(() => {
       const getUsers = async () =>  {
            await userRequest.get('/users').then((res) => {
                setUsers(res.data)
            }).catch((err) => {
                console.log(err)
            })
            }
        getUsers() 
    },[])

    const columns = [
        { 
            field: '_id', 
            headerName: 'ID', 
            width: 120
        },
        { 
            field: 'name', 
            headerName: 'Name', 
            width: 190
        },
        { 
            field: 'username', 
            headerName: 'User', 
            width: 150, renderCell: (params)=>{
            return (
                <div className="userListUser">
                    <img className="userListAvatar" src={params.row.img} alt="user img" />
                    {params.row.username}
                </div>
            )} 
        },
        { 
            field: 'email', 
            headerName: 'Email', 
            width: 200 
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 120,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 130, renderCell: (params) => {
            return (<>
                <Link to={'/users/'+params.row._id}>
                    <button className='btn btn-primary' style={{backgroundColor: "rgb(2, 65, 65)", border:'none'}}>Edit</button>
                </Link>
            </>)}
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 130, renderCell: (params) => {
            return (<>
                <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row._id)}/>
            </>)}
        }
    ];
    
    return (<>
        <Topbar />
            <div style={{display:'flex'}}>
            <Sidebar /> 
            <div className="container ">
                <div className='userList'>
                    <DataGrid 
                        rows={users} 
                        disableSelectionOnClick 
                        columns={columns} 
                        getRowId={(row) => row._id}
                        autoHeight={true}
                        hideFooter={false}
                        checkboxSelection 
                    />
                </div>
            </div>
        </div>
    </>)
}

export default UserList