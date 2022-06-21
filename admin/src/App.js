import {BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom'
import Sidebar from "./components/sidebar/Sidebar"
import Topbar from "./components/topbar/Topbar"
import Home from "./pages/home/Home"
import UserList from './pages/userList/UserList'
import User from './pages/user/User'
import NewUser from './pages/newUser/NewUser'
import NewProduct from './pages/newProduct/NewProduct'
import ProductList from './pages/products/ProductList'
import Product from './pages/product/Product'
import "./app.css"

function App() {
  return (
    <Router>
    <div className="App"> 
      <Topbar />
      <div className="container">
        <Sidebar />
          <Switch>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/users" element={<UserList/>}/>
            <Route path="/users/:userId" element={<User/>}/>
            <Route path="/newuser" element={<NewUser/>}/>
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/products/:id" element={<Product/>}/>
            <Route path="/newproduct" element={<NewProduct/>}/>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
