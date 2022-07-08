import { logOut } from '../../redux/userRedux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import React from 'react'

const Container = styled.div`
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    width: 100%;
    height: 100vh;
    background: #ADA996;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`
const Btn = styled.button`
    padding: 20px;
    border-radius: 10px;
    background-color: darkcyan;
    color:white;
`
const Redirect = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const handleClick = (e) => {
        dispatch(logOut(), history('/'))
    }
    return (
        <div style={{backgroundColor:'black', height:'100%'}}>
        <Container>
            <br/>You not is Admin, contact on jardelduarte594@gmail.com<br/><br/>
            <br/>Or try with correct credentials <br/>
            <Btn onClick={handleClick}> Login Page </Btn>
        </Container>
        </div>
    )
}
export default Redirect