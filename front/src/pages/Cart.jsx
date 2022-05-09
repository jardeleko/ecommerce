import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import styled from 'styled-components'
import { Add, Remove } from '@material-ui/icons'
import { mobile } from '../responsive'

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

const TopButton = styled.button`
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
const ProductName = styled.span`
    
`
const ProductId = styled.span``

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
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
        <Title>YOUR BAG</Title>
            <Top> 
            <TopButton>CONTINUE SHOPPING</TopButton>
            <TopTexts>
                <TopText>Shopping Bag (2)</TopText>
                <TopText>Your Wishlist (0)</TopText>
            </TopTexts>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
            </Top>
        <Bottom> 
            <Info>
                <Product>
                    <ProductDetail>
                        <Image src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/45ee8e5deb4046c5b25fadb700ee9030_9366/Tenis_Sarlacc_Pit_Samba_Bege_GX6806_04_standard.jpg"/>
                        <Details>
                            <ProductName><b>Product:</b> ADIDAS SARLACC PIT SAMBA</ProductName>
                            <ProductId><b>ID:</b> 9931210311</ProductId>
                            <ProductColor color="beige"/>
                            <ProductSize><b>Size:</b> 10</ProductSize>
                        </Details>
                    </ProductDetail>
                    <PriceDetail>
                        <ProductAmountContainer>
                            <Add/>
                            <ProductAmount> 2</ProductAmount>
                            <Remove/>
                        </ProductAmountContainer>
                        <ProductPrice>$ 100</ProductPrice>
                    </PriceDetail>
                </Product>
                <Hr/>
                <Product>
                <ProductDetail>
                    <Image src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/78d89badd0f04777ac91ace200b512ec_9366/Camisa_2_Real_Madrid_21-22_Azul_GR3985_01_laydown.jpg"/>
                    <Details>
                        <ProductName><b>Product:</b> REAL MADRID SHIRT 21/22 MODEL 2</ProductName>
                        <ProductId><b>ID:</b> 20221111111</ProductId>
                        <ProductColor color="blue"/>
                        <ProductSize><b>Size:</b> L</ProductSize>
                    </Details>
                </ProductDetail>
                <PriceDetail>
                    <ProductAmountContainer>
                        <Add/>
                        <ProductAmount>1</ProductAmount>
                        <Remove/>
                    </ProductAmountContainer>
                    <ProductPrice>$65</ProductPrice>
                </PriceDetail>
            </Product>
            </Info>
            <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                    <SummaryItemText>Subtotal</SummaryItemText>
                    <SummaryItemText>$ 165</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemText>$ 5.90</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemText>$ -20</SummaryItemText>
                </SummaryItem>
                <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemText>$ 150.9</SummaryItemText>
                </SummaryItem>
                <Button>BUY NOW</Button>
            </Summary>
        </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart