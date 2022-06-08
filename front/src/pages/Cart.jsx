import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import styled from 'styled-components'
import { RestoreFromTrash } from '@material-ui/icons'
import { mobile } from '../responsive'
import { useSelector, useDispatch } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { resetSkill, removeProduct } from '../redux/cartRedux'
import publicRequest from '../request/publicMethods'
import axios from 'axios'


const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div`
`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding:"10px"})}
`
const Title = styled.h1`
    text-align: center;
    font-weight:300;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.a`
    padding: 10px;
    font-weight: 600;
    cursor:pointer;
    border: none;
    background-color: transparent;
    color: black;
    &:hover{
        text-decoration:underline;
    }
`
const TopTexts = styled.div`
    ${mobile({display:"none"})}
`

const TopText = styled.span`
    text-decoration:underline;
    cursor: pointer;
    margin: 0px 10px;

`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection:"column"})}

`
const Info = styled.div`
    flex:3;
`
const Product = styled.div`
    display: flex;
    justify-content:space-between;
    ${mobile({flexDirection:"column"})}

`
const ProductDetail = styled.div`
    flex:2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
    border-radius:10px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction:column;
    justify-content:space-around;
`
const ProductName = styled.span``

const ProductColor = styled.span`
    width: 20px;
    height: 20px;
    border-radius:50%;
    background-color: ${props=>props.color};

`
const ProductSize = styled.span`
    font-size: 20px;
`

const PriceDetail = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({margin:"5px 15px"})}

`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({marginBottom:"20px"})}

`
const Hr = styled.hr`
    background-color:#eee;
    border:none;
    height: 1px;
    margin: 10px;
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content:space-between;
    font-weight:${props=>props.type === "total" && "500"};
    font-size:${props=>props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`
    margin-left:5px;
`

const Button = styled.button`
    width: 100%;
    margin-right:40px;
    padding: 10px;
    background: linear-gradient(90deg, teal, #777777);
    border:10px;
    color:white;
    font-weight:600;
    cursor:pointer;
`

const Cart = () => {
    const cart = useSelector((state) => state.cart)
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch()
    const [stripeToken, setStripeToken] = useState(null);
    const history = useNavigate()
    const BASE_URL = "http://localhost:3030/api"
    const localRequest = axios.create({
        baseURL: BASE_URL,
        headers: {token: `Bearer ${currentUser.accessTk}`}
    })

    const handleClick = async (product) => { 
        await localRequest.delete(`/cart/${product._idCart}`).then((res) => {
            window.location.reload(true);
            dispatch(removeProduct({product}))
        }).catch((err) => {
            console.log(err)
        })
    }

    const onToken = (token) => {
        setStripeToken(token);
    }
    const handleReset = (e) =>{
        e.preventDefault()
        dispatch(resetSkill())
    }
    
    useEffect(()=> {
        const makeRequest = async () => {
            const localPrice = cart.total * 100;
        await publicRequest.post("/checkout/payment", { 
            tokenId: stripeToken.id, 
            amount: localPrice,
            }).then((res) => {
                history("/success", {state:{data:res.data}})  
                console.log(res.data)  
            }).catch((err) => {
                console.log(err);
            })
        }
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, history])
    
    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
            <Title>YOUR BAG</Title>
                <Top> 
                <TopButton href='/'>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag ({cart.quantity})</TopText>
                    <TopText>Your Wishlist (0)</TopText>
                </TopTexts>
                <TopButton type="filled" onClick={handleReset}>CLEAN CART</TopButton>
                </Top>
            <Bottom> 
                <Info>
                    {cart.products.map((product) => (
                    <Product>
                        <ProductDetail>
                            <Image src={product.img}/>
                            <Details>
                                <ProductName><b>Product: </b>{product.title}</ProductName>
                                <ProductColor color= {product.color}/>
                                <ProductSize><b>Size: </b>  {product.size}</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>                        
                                    <ProductAmount> {product.quantity} </ProductAmount>
                                        <RestoreFromTrash style={{marginRight:"10px", color:"#ed1c3c", cursor:"pointer"}} onClick={() => handleClick(product)}/>
                                    </ProductAmountContainer>
                            <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                        </PriceDetail>
                    </Product>                    
                    ))}
                    <Hr />
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemText>$ {cart.total}</SummaryItemText>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemText>$ 0.00 (free shipping)</SummaryItemText>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemText>$ 0.00</SummaryItemText>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemText>$ {cart.total} </SummaryItemText>
                    </SummaryItem>
                    <StripeCheckout
                        name="San Flame"
                        image="https://images.vexels.com/media/users/3/200093/isolated/preview/596f0d8cb733b17268752d044976f102-icone-de-sacola-de-compras.png"
                        billingAddress
                        shippingAddress
                        description={`TOTAL IS $ ${cart.total}`}
                        amount={cart.total*100}
                        token={onToken}
                        stripeKey={KEY}
                        >                       
                        <Button>BUY NOW</Button>
                    </StripeCheckout>    
                </Summary>
            </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
  )
}

export default Cart