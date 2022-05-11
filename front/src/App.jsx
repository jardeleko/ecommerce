import ReactDOMClient from 'react-dom/client'
import { BrowserRouter as Router, Routes as Switch, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Register from './pages/Register'
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from './pages/Cart';

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

const App = () => {
    const user = true;
root.render(
    <Router>
        <Switch>
            <Route path="/" element={<Home/>}/>
            <Route path="/product/:id" element={<Product/>}/>
            <Route path="/products/:category" element={<ProductList/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/login" element={user ? <Navigate to="/" /> :  <Login />} />
            <Route path = "/register" element={user ? <Navigate to="/" replace /> :  <Register />} />
        </Switch>
    </Router>
    )
}

export default App;