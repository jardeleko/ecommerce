import styled from 'styled-components'
import {Facebook, Instagram, Twitter, LinkedIn, Room, WhatsApp, MailOutline} from '@material-ui/icons'
import {mobile} from '../responsive'

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection:"column"})}
`
const Left = styled.div`
    flex: 1;    
    display: flex;
    flex-direction: column;
`
const Center = styled.div`
    flex: 1;    
    padding: 20px; 
    ${mobile({display:"none"})}
`
const Title = styled.h3`
    margin-bottom:30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none ;
    display: flex;
    flex-wrap:wrap;
`

const ListItem = styled.li`
    width:50% ;
    margin-bottom: 10px;
`

const Right = styled.div`
    flex: 1;
    padding: 20px; 
    ${mobile({backgroundColor:"#fff8f8"})}
`
const ContactItem = styled.div`
    display:flex;
    margin-bottom: 20px;
    align-content: center;
`

const Logo = styled.h1`
    margin-left: 20px;
    margin-top: 10px ;
    text-align: justify;
`
const Payment = styled.img`
    margin-top:5px ;
    width: 270px;
    height: 78px
`

const Desc = styled.p`
    margin-top:10px ;
    margin-left: 20px;
    margin-bottom:20px;
`

const SocialContainer = styled.div`
    display:flex;
`

const SocialIcon = styled.div`
    margin:10px;
    margin-left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color:white;
    background-color: #${props =>props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    padding: 5px;
`

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>SAN FLAME.</Logo>
            <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur placerat ipsum, eget fringilla nisi mollis vitae. Nulla nec libero vehicula, egestas turpis in, iaculis nunc. Aenean lobortis libero in ornare tincidunt. Fusce a placerat odio. Cras sollicitudin consequat mauris, eu ullamcorper nibh pulvinar eu. Vivamus sodales ex mauris, sed porttitor ipsum interdum in. Mauris malesuada, quam sed sollicitudin laoreet, urna est viverra lacus, nec congue dui dolor non lorem. Cras sit amet tincidunt magna, at pretium arcu.</Desc>
            <SocialContainer>
                <SocialIcon color="3b5999"><Facebook/></SocialIcon>
                <SocialIcon color="e4405f"><Instagram/></SocialIcon>
                <SocialIcon color="55acee"><Twitter/></SocialIcon>
                <SocialIcon color="0e76a8"><LinkedIn/></SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Man Fashion</ListItem>
                <ListItem>Women Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
           <Title>Contáctame</Title>
           <ContactItem><Room style={{marginRight:"10px", color:"gray"}}/>Sete de Setembro 656, Santa Maria, RS-Brasil.</ContactItem>
           <ContactItem><WhatsApp style={{marginRight:"10px", color:"#25D366"}}/>+55 (49) 988331283 </ContactItem>
           <ContactItem><MailOutline style={{marginRight:"10px", color:"#EA4335"}}/>jardelduarte594@gmail.com</ContactItem>
           <Payment src="https://www.nicepng.com/png/full/83-836237_credit-cards-logo-png-png-free-download-metodos.png"/>
        </Right>
    </Container>
  )
}

export default Footer