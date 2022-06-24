import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { login } from '../../redux/apiCalls'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #ADA996;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width:25%;
    padding: 20px;
`

const Title = styled.h1`
    text-align:center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight:600;
`

const Form = styled.form`
    display: flex;
    flex-direction:column;
    margin: 20px;
`

const Input = styled.input`
    flex:1;
    font-size:15px;
    min-width:40%;
    margin: 5px 0px;
    border:1px solid lightslategray;
    padding: 10px;
    color:black;
    border-radius:5px;
`
const Button = styled.button`
    width: 100%;
    border-radius:5px;
    border:none;
    margin-top:10px;
    padding: 10px 20px;
    margin-bottom:20px;
    background-color:#7daf82;
    color:white;
    font-weight:bold;
    cursor:pointer;
    &:hover{
        background-color:#54a85c;
    }
    &:disabled{
        background-color: #54a85c;
        color: #54a85c;
        cursor: not-allowed;
    }
`
const Error = styled.span`
    font-weight: bold;
    color:red;
    margin:5px;
`

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.product.error);    
    const handleLogin = (e) => {
        e.preventDefault();
        login(dispatch, {username, password})
    }
    const content = (
        <Container>
        <Wrapper>
            <Title>SIGN IN </Title>
            <Form>
                <Input placeholder="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
                <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <Button onClick={handleLogin} >LOGIN</Button>
                {error && <Error> Wrong credentials, try again! </Error>}
            </Form>
        </Wrapper>        
    </Container>
    )
    return content
}

export default Login;