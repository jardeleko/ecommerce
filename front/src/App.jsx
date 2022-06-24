import { BrowserRouter as Router, Routes as Switch, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import Register from './pages/Register'
import Login from "./pages/Login"
import ProductList from "./pages/ProductList"
import Product from "./pages/Product"
import Cart from './pages/Cart'
import Success from "./pages/Success"
import { useSelector } from 'react-redux'
import Profile from "./pages/Profile"
import Orders from "./pages/Orders"

const App = () => {
    const user = useSelector((state)=> state.user.currentUser);
    return(
    <Router>
        <Switch>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/product/:id" element={<Product/>}/>
            <Route path="/products/:category" element={<ProductList/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/success" element={<Success/>}/>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path = "/register" element={user ? <Navigate to="/" replace /> : <Register />} />
        </Switch>
    </Router>
    )
}

export default App;