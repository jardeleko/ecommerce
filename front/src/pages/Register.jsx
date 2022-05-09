import styled from 'styled-components'
import {mobile} from '../responsive'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url("https://raw.githubusercontent.com/jardeleko/flow/main/public/img/bg2.jpg"); 
    background-size: cover;
    background-repeat:no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width:40%;
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
    flex-wrap:wrap;
    margin: 20px;
    margin-left:10%;
`

const Input = styled.input`
    flex:1;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size:15px;
    min-width:40%;
    margin: 20px 10px 0px 0px;
    border:1px solid lightslategray;
    padding: 10px;
    color:black;
    ${mobile({width:"86.7%"})}
`
const Div = styled.div`
    margin-bottom: 10px;
`

const Agreement = styled.span`
    font-size: 15.4px;
    margin: 20px 0px;
    margin-right:30px;
    color:black;
    font-weight:600;
`
// cadetblue || cornflowerblue

const Link = styled.a`
    color:crimson;
    text-decoration:none;
    font-weight:bold;

     &:hover{        
        color:#54a85c;
    }
`

const Button = styled.button`
    width: 37%;
    border:none;
    padding: 10px 20px;
    background-color:#7daf82;
    color:white;
    font-weight:bold;
    cursor:pointer;
    &:hover{
        background-color:#54a85c;
    }
    ${mobile({width:"95%"})}
`


const Register = () => {
  return (
    <Container>
        <Wrapper>
            <Title>CREATE ACCOUNT</Title>
            <Form>
                <Div>
                    <Input placeholder="name" name="name"/>
                    <Input placeholder="last name" type="text" name="lastname" />
                    <Input placeholder="email" type="email" name="email"/>
                    <Input placeholder="username" type="text" name="username"/>
                    <Input placeholder="password" type="password" name="password"/>
                    <Input placeholder="confirm password" type="password" name="confirm"/>
                </Div>
                <Agreement>
                    If you have account<Link href='/Login'> click here</Link> to SIGN IN.
                </Agreement>
                <Button>CREATE</Button>
            </Form>
        </Wrapper>        
    </Container>
  )
}

export default Register