import publicRequest from '../../request/publicMethods'
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { isEmpty } from '@firebase/util'
import { useState } from "react"
import "../../app.css"
import './newUser.css'

const NewUser = () => {
    const [inputs, setInputs] = useState({})
    const [address, setAddress] = useState([])
    const handleSubmit = async () => {
        if(!isEmpty(inputs) && !isEmpty(address)){
            const result = {...inputs, address}
            await publicRequest.post('/auth/register', result).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    const handleChange = (e) => {
        e.preventDefault()
        setInputs(prev => {
            return {...prev, [e.target.name]:e.target.value}
        })
    }
    const handleAddres = (e) => {
        e.preventDefault()
        setAddress(prev => {
            return {...prev, [e.target.name]:e.target.value}
        })
    }
    console.log(inputs)
    console.log(address)
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
                        <input 
                            type="text" 
                            name='name'
                            placeholder='Full Name'
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="newUserItem">
                        <label>Username</label>
                        <input 
                            type="text"
                            name='username' 
                            placeholder='Username'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="newUserItem">
                        <label>Password</label>
                        <input 
                            type="password"
                            name='password' 
                            placeholder='password' 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="newUserItem">
                        <label>email</label>
                        <input 
                            type="email" 
                            name='email'
                            placeholder='Email' 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="newUserItem">
                        <label>Phone</label>
                        <input 
                            type="text"
                            name='phone' 
                            placeholder='+55 55 99882121'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="newUserItem">
                        <div className="newUserGender">
                            <input 
                                type="radio" 
                                name='gender' 
                                id='male' 
                                value='male' 
                                onChange={handleChange}
                            />
                            <label for='male'>Male</label>
                            <input 
                                type="radio" 
                                name='gender' 
                                id='female' 
                                value='female' 
                                onChange={handleChange}
                            />
                            <label for='female'>Female</label>
                        </div>
                    </div>
                    <div className="newUserItem">
                        <label>Admin</label>
                        <select name="isAdmin" id="active" className="newUserSelect" onChange={handleChange} >
                            <option selected>Select</option>
                            <option value='true' for='isAdmin'>Yes</option>
                            <option value='false' for='isAdmin'>No</option>
                        </select>
                    </div>
                    <div className="newUserItem">
                        <span>Address</span>
                        <label>City, country: </label>
                        <input 
                            type="text" 
                            name='city'
                            placeholder='Santa Maria, Brasil' 
                            onChange={handleAddres}
                        />
                        <label>Code:</label>
                        <input 
                            type="text"
                            name='code' 
                            placeholder='97045450' 
                            onChange={handleAddres}
                        />
                        <label>Complement:</label>
                        <input 
                            type="text"
                            name='comp' 
                            placeholder='apto 302' 
                            onChange={handleAddres}
                        />
                        <label>Street:</label>
                        <input 
                            type="text"
                            name='street' 
                            placeholder='Sete de setembro' 
                            onChange={handleAddres}
                        />
                    </div>
                    <button className="newUserButton" onClick={handleSubmit}>Create</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default NewUser