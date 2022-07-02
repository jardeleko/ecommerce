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
import Exclusive from "./pages/Exclusive"
import RemoveItem from "./pages/RemoveItem"
import Fav from './pages/Fav'

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
            <Route path="/likes" element={<Fav/>}/>
            <Route path="/exclusive/:id" element={<Exclusive/>}/>
            <Route path="/remove/:id" element={<RemoveItem />}/>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path = "/register" element={user ? <Navigate to="/" replace /> : <Register />} />
        </Switch>
    </Router>
    )
}

export default App;