import { CalendarToday, LocationCity, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import Sidebar from "../../components/sidebar/Sidebar"
import { Link, useLocation } from 'react-router-dom'
import Topbar from "../../components/topbar/Topbar"
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '@firebase/util'
import app from '../../firebase'
import axios from 'axios'
import "../../app.css"
import './user.css'

const User = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const currentUser = useSelector((state) => state.user.currentUser)
    const [user, setUser] = useState([])
    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const [values, setAddress] = useState([])
    const BASE_URL = "http://localhost:3030/api"
    const localRequest = axios.create({
        baseURL: BASE_URL,
        headers: {token: `Bearer ${currentUser.accessTk}`}
    })
    
    useEffect(() => {
        const getUser = async () => {
            await localRequest.get(`/users/find/${id}`).then((res) => {
                setUser(res.data)
            }).catch((err) => {
                alert('Datas exists in db!')
                console.log(err)
            })
        }
        getUser()
    },[id])

    const handleChange = (e) => {
        e.preventDefault()
        setInputs(prev => {
            return {...prev, [e.target.name]:e.target.value}
        })
    }  
    const handleAddress = (e) => {
        e.preventDefault()
        setAddress(prev => {
            return {...prev, [e.target.name]:e.target.value}
        })
    }
    async function submitRecursive(user) {    
        await localRequest.put(`/users/${id}`, user).then((res) => {  
            console.log(res.data)  
        }).catch((err) => {
            console.log(err)
        })
        window.location.reload(true)        
    }
    const submitForm = async (e) => {
        e.preventDefault()
        if(!isEmpty(values) && file === null){
            const result = {...inputs, address:values}
            submitRecursive(result)
        }
        else if(file === null){         
            const result = {...inputs}
            submitRecursive(result)
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
            async () => {
              // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { 
                    if(!isEmpty(values)){ 
                        const result = {...inputs, address:values, img:downloadURL }
                        submitRecursive(result)
                    }else {
                        const result = {...inputs, img: downloadURL}
                        submitRecursive(result)
                    }    
                });
            }
          );
        }
    }
    return (
        <div className="App"> 
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className='user'> 
                    <div className="userTitleContainer">
                        <h1 className="userTitle">Edit User</h1>
                        <Link to={'/newUser'}>
                            <button className="userAddButton">Create</button>
                        </Link>
                    </div>
                    <div className="userContainer">
                        <div className="userShow">
                            <div className="userShowTop">
                                <img src={user.img} alt="img user" className="userShowImg" />
                                <div className="userShowTopTitle">
                                    <span className="userShowUsername">{user.name} </span>
                                    <span className="userShowUserTitle">Software Engineer</span>
                                </div>
                            </div>
                            <div className="userShowBottom">
                                <span className="userShowTitle">Account Details</span>
                                <div className="userShowInfo">
                                    <PermIdentity className='userShowIcon'/>
                                    <span className="userShowInfoTitle">{user.username}</span>
                                </div>
                                <div className="userShowInfo">
                                    <PermIdentity className='userShowIcon'/>
                                    <span className="userShowInfoTitle">{user.gender}</span>
                                </div>
                                <span className="userShowTitle">Contact Details</span>
                                <div className="userShowInfo">
                                    <PhoneAndroid className='userShowIcon'/>
                                    <span className="userShowInfoTitle">{user.phone || 'Null'}</span>
                                </div>
                                <div className="userShowInfo">
                                    <MailOutline className='userShowIcon'/>
                                    <span className="userShowInfoTitle">{user.email}</span>
                                </div>
                                <div className="userShowInfo">
                                    <LocationCity className='userShowIcon'/>
                                    <span className="userShowInfoTitle">Santa Maria, Brasil</span>
                                </div>

                            </div>
                        </div>
                        
                        <div className="userUpdate">
                            <span className="userUpdateTitle">Update Credentials</span>
                            <form className="userUpdateForm">

                                <div className="userUpdateLeft">
                                    <div className="userUpdateItem">
                                        <label>Full Name</label>
                                        <input type='text'
                                            placeholder={user.name}
                                            className='userUpdateInput'
                                            name='name'
                                            onChange={handleChange}
                                        ></input>
                                    </div>

                                    <div className="userUpdateItem">
                                        <label>Username</label>
                                        <input type='text'
                                            placeholder={user.username}
                                            className='userUpdateInput'
                                            name='username'
                                            onChange={handleChange}
                                        ></input>
                                    </div>
                                    
                                    <div className="userUpdateItem">
                                        <label>Email</label>
                                        <input type='email'
                                            placeholder={user.email}
                                            className='userUpdateInput'
                                            name='email'
                                            onChange={handleChange}
                                        ></input>
                                    </div>

                                    <div className="userUpdateItem">
                                        <label>Phone</label>
                                        <input type='text'
                                            placeholder={user.phone || 'Null'}
                                            className='userUpdateInput'
                                            name='phone'
                                            onChange={handleChange}
                                        ></input>
                                    </div>

                                    <div className="userUpdateItem">
                                    <label>Gender: </label>      
                                        <select name='gender' id='gender' onChange={handleChange}>
                                            <option for='gender' selected>Select</option>
                                            <option value='male' for='gender'>Male</option>
                                            <option value='female' for='gender'>Female</option>
                                        </select>
                                    </div>    
                                    {user.address?.map((item) => (                           
                                    <div className="userUpdateItem">
                                        <span className="userUpdateTitle" style={{margin:'0px 0px 20px 0px'}}>Address Details</span>
                                        <label>Street, locale </label>
                                        <input type='text'
                                            placeholder={item.street || 'null'}
                                            className='userUpdateInput'
                                            name='street'
                                            onChange={handleAddress}
                                        ></input>
                                        <label>Postal Code</label>
                                        <input type='text'
                                            placeholder={item.code || 'null'}
                                            className='userUpdateInput'
                                            name='code'
                                            onChange={handleAddress}
                                        ></input>
                                        <label>Complement</label>
                                        <input type='text'
                                            placeholder={item.comp || 'null'}
                                            className='userUpdateInput'
                                            name='comp'
                                            onChange={handleAddress}
                                        ></input>
                                        <label>City, Country</label>
                                        <input type='text'
                                            placeholder={item.city || 'null'}
                                            className='userUpdateInput'
                                            name='city'
                                            onChange={handleAddress}
                                        ></input>
                                    </div>
                                    ))}        
                                </div>

                                <div className="userUpdateRight">
                                    <div className="userUpdateUpload">
                                        <img src={user.img}
                                        alt="update profile" className="userUpdateImage" />
                                        <label htmlFor='file'><Publish className='updateIcon' /></label>
                                        <input type="file" id="file" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
                                    </div>
                                    <button className="userUpdateButton" onClick={submitForm}>Update</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User