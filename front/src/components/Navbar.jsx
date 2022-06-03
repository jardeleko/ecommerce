import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/userRedux';
import { resetSkill } from '../redux/cartRedux';
const LS = styled(Link)`
    color: #ffffff;
    text-decoration:none;
    font-weight:bold;
    &:hover{        
        color:#54a85c;
        text-decoration:none;
    }
    cursor:pointer;

`;

const Container = styled.div`
    height: 60px;
    background-color: #3a3736;
    color: #ffffff;
    ${mobile({height:"50px"})}
`
const Wrapper = styled.div`
    padding:10px 20px;
    display:flex;
    justify-content: space-between;
    ${mobile({padding:"10px 0px"})}
`
const Language = styled.div`
    font-size: 14px;
    cursor: pointer;
    ${mobile({display:"none"})}
`
const Left = styled.div`
    flex: 1;
    display:flex;
    align-items:center; 
`
const Center = styled.div`
    flex: 0.3;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center; 
    justify-content: flex-end;
    margin-left: 25px;
    ${mobile({flex:"1.1",justifyContent:"center"})}

`
const SearchContainer = styled.div`
    padding: 5px;
    margin-left:25px;
    border:0.5px solid lightgray;
    display:flex;
    align-items:center;  
    background-color: white;
`
const Input = styled.input`
    border:none;
    ${mobile({width:"50px"})}
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize:"16px"})}

`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left:25px;
    ${mobile({fontSize:"12px", marginLeft:"10px"})}
`

const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch()
    const handleEvent = (e) => {
        e.preventDefault()
        dispatch(resetSkill())
        dispatch(logOut())
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                        <SearchContainer> 
                            <Input placeholder='search'/>
                            <Search style={{color:"gray", fontSize:16}}/>
                        </SearchContainer>
                </Left>
                <Center>
                    <Logo><LS to={`/`}> SAN FLAME</LS></Logo>
                </Center>
                <Right>
                    <MenuItem> <LS to={`/register`}>REGISTER</LS></MenuItem>
                   {currentUser 
                        ? <MenuItem><LS to={`/login`} onClick={handleEvent}>LOGOUT</LS></MenuItem>
                        : <MenuItem><LS to={`/login`}>SIGN IN</LS></MenuItem>
                   }
                    <MenuItem>
                    <LS to={`/cart`}>
                        <Badge 
                            badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </LS>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;