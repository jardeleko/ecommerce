import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    height: 30px;
    background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
                linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
                linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);  
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:14px;
    font-weight:bold;
`

const Announcement = () => {
  return (
    <Container>
        Super Deal! Free Shipping on Orders Over $50
    </Container>
  )
}

export default Announcement