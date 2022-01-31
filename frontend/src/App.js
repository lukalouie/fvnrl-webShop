import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import {Container} from "react-bootstrap"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import ProductsScreen from "./screens/ProductsScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import AccountScreen from "./screens/AccountScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import AboutUsScreen from "./screens/AboutUsScreen"
import FAQScreen from "./screens/FAQScreen"
import ShippingPolicyScreen from "./screens/ShippingPolicyScreen"
import ContactUsScreen from "./screens/ContactUsScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import OrderListScreen from "./screens/OrderListScreen"



function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
      <Container>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/products" component={ProductsScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/account" component={AccountScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/about" component={AboutUsScreen} />
        <Route path="/faq" component={FAQScreen} />
        <Route path="/shippingpol" component={ShippingPolicyScreen} />
        <Route path="/contact" component={ContactUsScreen} />
        <Route path="/admin/userlist" component={UserListScreen} />
        <Route path="/admin/user/:id/edit" component={UserEditScreen} />
        <Route path="/admin/productlist" component={ProductListScreen} />
        <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        <Route path="/admin/orderlist" component={OrderListScreen} />
      </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
