import { CalendarToday, LocationCity, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons'
import './user.css'
import {Link} from 'react-router-dom'
const User = () => {
  return (
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
                    <img src="https://avatars.githubusercontent.com/u/26754111?v=4" alt="img user" className="userShowImg" />
                    <div className="userShowTopTitle">
                        <span className="userShowUsername">Jardel O Dut </span>
                        <span className="userShowUserTitle">Software Engineer</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                        <PermIdentity className='userShowIcon'/>
                        <span className="userShowInfoTitle">jardeleko</span>
                    </div>
                    <div className="userShowInfo">
                        <CalendarToday className='userShowIcon'/>
                        <span className="userShowInfoTitle">21/11/1991</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                        <PhoneAndroid className='userShowIcon'/>
                        <span className="userShowInfoTitle">+55 49988025159</span>
                    </div>
                    <div className="userShowInfo">
                        <MailOutline className='userShowIcon'/>
                        <span className="userShowInfoTitle">jardelduarte594@gmail.com</span>
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
                                placeholder='Jardel O Dut'
                                className='userUpdateInput'
                            ></input>
                        </div>
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input type='text'
                                placeholder='jardeleko'
                                className='userUpdateInput'
                            ></input>
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input type='email'
                                placeholder='jardelduarte594@gmail.com'
                                className='userUpdateInput'
                            ></input>
                        </div>
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input type='text'
                                placeholder='+55 49988025159'
                                className='userUpdateInput'
                            ></input>
                        </div>
                        <div className="userUpdateItem">
                            <label>Address</label>
                            <input type='text'
                                placeholder='Santa Maria, Brasil'
                                className='userUpdateInput'
                            ></input>
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src="https://avatars.githubusercontent.com/u/26754111?v=4"
                             alt="update profile" className="userUpdateImage" />
                             <label htmlFor='file'><Publish className='updateIcon'/></label>
                            <input type="file" id="file" style={{display:"none"}}/>
                        </div>
                        <button className="userUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default User