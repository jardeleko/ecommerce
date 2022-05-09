import Navbar from '../components/Navbar'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Footer from '../components/Footer'
import {mobile} from '../responsive'

const Container = styled.div``
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({margin:"0px 20px", display:"flex", flexDirection:"column"})}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: bold;
    margin-right: 20px;
    ${mobile({marginRight:"0px"})}

`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    background-color: white;
    border:1px solid black;
    ${mobile({margin:"10px 0px"})}
`
const Option = styled.option``

const ProductList = () => {
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title> Dresses </Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products: </FilterText>
                <Select>
                    <Option disable selectd>Color</Option>
                    <Option>White</Option>
                    <Option>Black</Option>
                    <Option>Red</Option>
                    <Option>Blue</Option>
                    <Option>Yellow</Option>
                    <Option>Green</Option>
                    <Option>Gray</Option>
                    <Option>Purple</Option>
                    <Option>Orange</Option>
                    <Option>Pink</Option>
                    <Option>Brown</Option>
                </Select>
                <Select>
                    <Option disable selectd>Size</Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products: </FilterText>
                <Select>
                    <Option disable selectd>Newest</Option>
                    <Option>Price (asc)</Option>
                    <Option>Price (desc)</Option>
                </Select>                
            </Filter>
            
        </FilterContainer>
        <Products/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList