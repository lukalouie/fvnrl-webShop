import React, { useEffect} from "react"
import { Link } from "react-router-dom"
import { Row, Col, ListGroup, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import CheckoutSteps from "../components/CheckoutSteps"
import { createOrder } from "../actions/orderActions"

function PlaceOrderScreen({ history }) {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, curr) => acc + curr.price, 0)

    cart.shippingPrice = cart.itemsPrice > 100 ? 25 : 0

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(!userInfo) {
            history.push("/account")
        }
    }, [userInfo])

    useEffect(() => {

        if(success && order) {
            history.push(`/order/${order._id}`)
        }
    }, [history, success, order ])

    const placeOrderHandler = (event) => {
        event.preventDefault();
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <div style={{"marginLeft":"3rem", "marginRight":"3rem"}}>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item style={{"backgroundColor":"black", "color":"white", "textAlign":"center"}}>
                        <h2>Shipping</h2>
                        <br/>
                        <p>
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                        </ListGroup.Item>
                        <ListGroup.Item style={{"backgroundColor":"black", "color":"white", "textAlign":"center"}}>
                            <h2>Payment Method</h2>
                            <br/>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
                            <br/>
                            <h2>Order Items</h2>
                            <br/>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant="flush" style={{"border":"1px solid white"}}>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index} style={{"backgroundColor":"black", "color":"white"}}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}/>
                                                    {item.name} <strong>{item.size}</strong>
                                                </Col>
                                                <Col md={4}>
                                                    {item.price}€
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush" style={{"textAlign":"center"}}>
                        <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
                            <h2>Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
                            <Row>
                                <Col> Items </Col>
                                <Col>{cart.itemsPrice}€</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
                            <Row>
                                <Col> Shippping </Col>
                                <Col>{cart.shippingPrice}€</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
                            <Row>
                                <Col> Total </Col>
                                <Col>{cart.totalPrice}€</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
                            {error && <Message variant="danger">{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
                            <button type="submit" className="btn effect01" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>   
        </div>
    )
}

export default PlaceOrderScreen
