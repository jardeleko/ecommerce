import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import { resetSkill } from "../redux/cartRedux"

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`
const Button = styled.button`
  padding: 20px;
  margin-top: 20px;
  border: 1px solid gray;
  border-radius:10px;
  background-color: green;
  color:#fff;
`
const Success = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.data;
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser.accessTk)
  const [orderId, setOrderId] = useState(null);


  useEffect(()  => {
    const BASE_URL = "http://localhost:3030/api"
    const localRequest = axios.create({
        baseURL: BASE_URL,
        headers: {token: `Bearer ${currentUser.accessTk}`}
    })
    const createOrder = async () => {
      await localRequest.post("/orders", 
        {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        }).then((res) => {
          setOrderId(res.data._id);
          dispatch(resetSkill())
        }).catch((err) => {
          console.log("error order"+err);
        })
    };
    data && createOrder();
  }, [cart, data, currentUser, dispatch]);

  return (
    <Container>
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link  to={`/`}>
        <Button>Go to Homepage</Button>
      </Link>  
    </Container>
  );
};

export default Success;