import styled from 'styled-components'
import {mobile} from '../responsive'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url("https://raw.githubusercontent.com/jardeleko/flow/main/public/img/bg3.png"); 
    background-size: cover;
    background-repeat:no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width:25%;
    padding: 20px;
    background-color: white;
    opacity:0.9;
    border-radius: 10px;
    ${mobile({width:"75%"})}
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
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size:15px;
    min-width:40%;
    margin: 5px 0px;
    border:1px solid lightslategray;
    padding: 10px;
    color:black;
`

const Link = styled.a`
    color:solid blue;
    font-size:15px;
    text-decoration: silver;
    font-weight:bold;
    margin: 10px;

     &:hover{        
        color:#54a85c;
        text-decoration:underline;
    }
    cursor:pointer;
`

const Button = styled.button`
    width: 100%;
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
`


const Login = () => {
  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN </Title>
            <Form>
                <Input placeholder="username" type="text" name="username"/>
                <Input placeholder="last name" type="password" name="password"/>
                <Button>LOGIN</Button>
                <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                <Link>CREATE A NEW ACCOUNT</Link>
            </Form>
        </Wrapper>        
    </Container>
  )
}

export default Login