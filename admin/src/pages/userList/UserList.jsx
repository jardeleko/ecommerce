import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { DeleteOutline } from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './userList.css'
import "../../app.css"

const UserList = () => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const [users, setUsers] = useState([])
    const BASE_URL = "http://localhost:3030/api"
    const localRequest = axios.create({
        baseURL: BASE_URL,
        headers: {token: `Bearer ${currentUser.accessTk}`}
    })
    async function handleDelete(id) {
        await localRequest.delete(`/users/${id}`).then((res) => {
            console.log(res.data)
            window.location.reload(true)        
        }).catch((err) => {
            console.log(err)
        })
      }
    useEffect(() => {
       const getUsers = async () =>  {
            await localRequest.get('/users').then((res) => {
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
            width: 190 
        },
        { 
            field: 'name', 
            headerName: 'Name', 
            width: 200
        },
        { 
            field: 'username', 
            headerName: 'User', 
            width: 200, renderCell: (params)=>{
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
            width: 250 
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
                    <button className='userListButton'>Edit</button>
                </Link>
            </>)}
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 150, renderCell: (params) => {
            return (<>
                <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row._id)}/>
            </>)}
        }
    ];
    
    return (
        <div className="App"> 
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className='userList'>
                    <DataGrid 
                    rows={users} 
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

export default UserList