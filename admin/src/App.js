import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Transactions from './pages/transactions/Transactions'
import { useSelector } from 'react-redux'
import Home from "./pages/home/Home"
import UserList from './pages/userList/UserList'
import User from './pages/user/User'
import NewUser from './pages/newUser/NewUser'
import NewProduct from './pages/newProduct/NewProduct'
import ProductList from './pages/products/ProductList'
import Product from './pages/product/Product'
import Login from './pages/login/Login'
import Redirect from './pages/redirect/Redirect'
import Analytics from './pages/analytics/Analytics'
import Report from './pages/report/Report'
import "./app.css"


function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  let admin
  if(currentUser){
    admin = currentUser.isAdmin
  }
  else{
    admin = 'default'
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={currentUser ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={admin ? <Home/> : <Navigate to="/redirect"/>}/>
        <Route path="/users" element={admin ? <UserList/> : <Navigate to="/redirect"/>}/>
        <Route path="/users/:userId" element={admin ? <User/> : <Navigate to="/redirect"/>}/>
        <Route path="/newuser" element={admin ? <NewUser/> : <Navigate to="/redirect"/>}/>
        <Route path="/products" element={admin ? <ProductList/> : <Navigate to="/redirect"/>}/>
        <Route path="/products/:id" element={admin ? <Product/> : <Navigate to="/redirect"/>}/>
        <Route path="/newproduct" element={admin ? <NewProduct/> : <Navigate to="/redirect"/>}/>
        <Route path="/reports" element={admin ? <Report/> : <Navigate to="/redirect"/>}/>
        <Route path="/transactions" element={admin ? <Transactions/> : <Navigate to="/redirect"/>}/>
        <Route path="/analytics" element={admin ? <Analytics/> : <Navigate to="/redirect"/>}/>
        <Route path="/redirect" element={<Redirect />}/>
      </Routes>
    </Router>
  )
}

export default App;
