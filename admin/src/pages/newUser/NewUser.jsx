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
    return (<> 
        <Topbar />
        <div style={{display:'flex'}}>
            <Sidebar />
            <div className="container p-3 my-3 border">
                    <h1 className="newUserTitle">New User</h1>
                    <form className="form-row">
                        <div className="form-group col-md-6">
                            <label>Full Name</label>
                            <input 
                                className='form-control'
                                type="text" 
                                name='name'
                                placeholder='Full Name'
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Username</label>
                            <input 
                                className='form-control'
                                type="text"
                                name='username' 
                                placeholder='Username'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Password</label>
                            <input 
                                className='form-control'
                                type="password"
                                name='password' 
                                placeholder='password' 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label className='staticEmail'>email</label>
                            <input 
                                className='form-control'
                                type="email" 
                                name='email'
                                placeholder='Email' 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Phone</label>
                            <input 
                                className='form-control'
                                type="text"
                                name='phone' 
                                placeholder='+55 55 99882121'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Admin</label>
                            <select name="isAdmin" id="active" className="newUserSelect" onChange={handleChange} >
                                <option selected>Select</option>
                                <option value='true' for='isAdmin'>Yes</option>
                                <option value='false' for='isAdmin'>No</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="form-group">
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
                        <br/>
                        <h4 className="" style={{justifyItems:'center'}}>Address</h4>

                        <div className="form-group col-md-6">
                            <label>City, country: </label>
                            <input 
                                className='form-control'
                                type="text" 
                                name='city'
                                placeholder='Santa Maria, Brasil' 
                                onChange={handleAddres}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Code:</label>
                            <input 
                                className='form-control'
                                type="text"
                                name='code' 
                                placeholder='97045450' 
                                onChange={handleAddres}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Complement:</label>
                            <input 
                                className='form-control'
                                type="text"
                                name='comp' 
                                placeholder='apto 302' 
                                onChange={handleAddres}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Street:</label>
                            <input 
                                className='form-control'
                                type="text"
                                name='street' 
                                placeholder='Sete de setembro' 
                                onChange={handleAddres}
                            />
                        </div>
                        
                        <div className="form-group col-md-6">
                            <button className="btn btn-outline-success"  onClick={handleSubmit} style={{marginTop:'32px', width:"220px"}} > Create New</button>
                        </div>
                    </form>
                </div>
                
        </div>
    </>)
}

export default NewUser