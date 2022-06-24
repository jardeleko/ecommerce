import './newUser.css'
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import "../../app.css"

const NewUser = () => {
  return (
    <div className="App"> 
        <Topbar />
        <div className="container">
            <Sidebar />
            <div className='newUser'>
                <h1 className="newUserTitle">New User</h1>
                <form className="newUserForm">
                    <div className="newUserItem">
                        <label>Full Name</label>
                        <input type="text" placeholder='Full Name' />
                    </div>
                    <div className="newUserItem">
                        <label>Username</label>
                        <input type="text" placeholder='Username' />
                    </div>
                    <div className="newUserItem">
                        <label>Password</label>
                        <input type="password" placeholder='password' />
                    </div>
                    <div className="newUserItem">
                        <label>email</label>
                        <input type="email" placeholder='Email' />
                    </div>
                    <div className="newUserItem">
                        <label>Phone</label>
                        <input type="text" placeholder='+55 55 99882121' />
                    </div>
                    <div className="newUserItem">
                        <label>Address</label>
                        <input type="text" placeholder='Santa Maria, Brasil' />
                    </div>
                    <div className="newUserItem">
                        <div className="newUserGender">
                            <input type="radio" name='gender' id='male' value='male' />
                            <label for='male'>Male</label>
                            <input type="radio" name='gender' id='female' value='female' />
                            <label for='female'>Female</label>
                            <input type="radio" name='gender' id='other' value='other' />
                            <label for='other'>Other</label>
                        </div>
                    </div>
                    <div className="newUserItem">
                        <label>Active</label>
                        <select name="active" id="active" className="newUserSelect">
                            <option value='yes'>Yes</option>
                            <option value='no'>No</option>
                        </select>
                    </div>
                    <button className="newUserButton">Create</button>
                
                </form>
            </div>
        </div>
    </div>
  )
}

export default NewUser