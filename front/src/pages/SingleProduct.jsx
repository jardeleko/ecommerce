import styled from 'styled-components'
import Navbar from '../components/Navbar'
import  Announcement  from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { Add, Remove } from '@material-ui/icons'
import {mobile} from '../responsive'

const Container = styled.div``

const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    ${mobile({padding:"10px", flexDirection:"column"})}

`
const ImgContainer = styled.div`
    flex:1;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit:cover;
    ${mobile({height:"40vh"})}

`
const InfoContainer = styled.div`
    flex:1;
    padding: 0px 50px;
    ${mobile({padding:"10px"})}

`
const Title = styled.h1`
    font-weight:400;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
    font-weight:400;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width:70% ;
    margin: 30px 0px;
    display: flex;
    justify-content:space-between;
    font-weight: bold ;
    ${mobile({width:"100%"})}

`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight:550;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius:50%;
    background-color: ${props=>props.color};
    margin:0px 5px;
    cursor:pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
    background-color: transparent;
    border:1px solid lightgray;
`
const FilterSizeOption = styled.option`
    color:#7daf82;
    font-weight:bold;
`
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({width:"100%"})}

`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight:700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius:10px;
    border:1px solid teal ;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px ;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight:600 ;
    &:hover{
        background-color: lightgoldenrodyellow;
        opacity:3;
    }
`

const SingleProduct = () => {
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImgContainer>
                <Image src="https://i.pinimg.com/564x/50/51/70/5051705ff8e9455a6a601a70a377b432.jpg"/>
            </ImgContainer>
            <InfoContainer>
                <Title>Denin Jeans</Title>
                <Desc>Commodo sint ea voluptate duis tempor consectetur eu quis magna sit voluptate ad. 
                Eu commodo cillum proident magna. 
                Labore occaecat tempor mollit nostrud excepteur occaecat tempor eiusmod fugiat incididunt ut dolore. 
                Sit eu officia id Lorem labore amet qui adipisicing anim minim.</Desc>
                <Price>¢ 20</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        <FilterColor color="black"/>
                        <FilterColor color="darkblue"/>
                        <FilterColor color="gray"/>
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize>
                            <FilterSizeOption>XS</FilterSizeOption>
                            <FilterSizeOption>S</FilterSizeOption>
                            <FilterSizeOption selected>M</FilterSizeOption>
                            <FilterSizeOption>L</FilterSizeOption>
                            <FilterSizeOption>XS</FilterSizeOption>
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove cursor="pointer"/>
                        <Amount>1</Amount>
                        <Add cursor="pointer"/>
                    </AmountContainer>
                    <Button>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter/>   
        <Footer/>
    </Container>
  )
}

export default SingleProduct