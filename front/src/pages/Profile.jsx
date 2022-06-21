import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router"
import axios from 'axios'
 
const Profile = () => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nick, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const BASE_URL = "http://localhost:3030/api"
    const localRequest = axios.create({
        baseURL: BASE_URL,
        headers: {token: `Bearer ${currentUser.accessTk}`}
    }) 
    let history = useNavigate();

    const handleSubmit = async (e) => {
        let nameaux
        let useraux
        let mailaux
        let genderaux
        e.preventDefault()
        if(name ==="" || name === null || name === undefined || !name){
            nameaux = currentUser.name
        }else{
            nameaux = name
        }
        if(nick ==="" || nick === null || nick === undefined || !nick){
            useraux = currentUser.username
        }else{
            useraux = nick
        }
        if(email ==="" || email === null || email === undefined || !email){
            mailaux = currentUser.email
        }else{
            mailaux = email
        }      
        if(gender ==="" || gender === null || gender === undefined || !gender){
            genderaux = currentUser.gender
        }else{
            genderaux = gender
        }      
        await localRequest.put(`/users/${currentUser._id}`, {
            name: nameaux,
            email: mailaux,
            username: useraux,
            gender: genderaux
        }).then((res) => {
            alert('Success ✓')
            history('/profile')
        }).catch((err) => {
            if(email === mailaux && err){
                console.log(err.status())
                alert('Email or Username exists on database... Please, try other!')
            }
            console.log("error in update:" + JSON.stringify(err))
        })
    }

    const content = (        
    <div className="form-body">
    <hr />
        <div className="form-holder">
            <div className="form-content-1">
                <div className="form-items">
                    <h3>Update account</h3>
                    <p>Change your credentials.</p>
                    <form onSubmit={handleSubmit} className="requires-validation" novalidate>
                        <div className="col-md-12">
                        <input className="form-control"type='text' onChange={(e) => setName(e.target.value)} placeholder={currentUser.name}/>
                            <div className="valid-feedback"></div>
                            <div className="invalid-feedback">Username field cannot be blank!</div>
                        </div>
                        <div className="col-md-12">
                            <input className="form-control" type='text' onChange={(e) => setUsername(e.target.value)} placeholder={currentUser.username}/>
                            <div className="valid-feedback">Email field is valid!</div>
                            <div className="invalid-feedback">Email field cannot be blank!</div>
                        </div><br />
                        <div className="col-md-12">
                            <input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} placeholder={currentUser.email} style={{backgroundColor:'rgb(247, 231, 162)'}}/>
                            <div className="valid-feedback">Email field is valid!</div>
                            <div className="invalid-feedback">Email field cannot be blank!</div>
                        </div><br/><br/>
                    <div className="col-md-12 mt-3">
                        <label className="mb-3 mr-1" for="gender">Gender: </label>
                        <input type="radio" className="btn-check" value="male" name="gender" id="male" onChange={(e) => setGender(e.target.value)} autocomplete="off"/>
                        <label className="btn btn-sm btn-outline-secondary" for="male">Male</label>
                        <input type="radio" className="btn-check" value="female" name="gender" id="female" onChange={(e) => setGender(e.target.value)} autocomplete="off"/>
                        <label className="btn btn-sm btn-outline-secondary" for="female">Female</label>
                        <input type="radio" className="btn-check" value="secret" name="gender" id="secret" onChange={(e) => setGender(e.target.value)} autocomplete="off"/>
                        <label className="btn btn-sm btn-outline-secondary" for="secret">Secret</label>
                        <div className="valid-feedback mv-up">You selected a gender!</div>
                            <div className="invalid-feedback mv-up">Please select a gender!</div>
                    </div>
                    <div className="form-button mt-3">
                        <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <span className="span">
            <p> If you need change password, go to login page, click in forget my password!</p>
        </span>
        <hr />
    </div>
    )

    return (
        <div className="body" style={{backgroundColor:'#f2f2dc'}}><Navbar />
            <div className="container">
            <center>{content}</center>
            </div>
        <Footer />
        </div>
    )
}

export default Profile