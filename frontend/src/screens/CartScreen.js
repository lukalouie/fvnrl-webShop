import React from 'react'
import { useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import Message from "../components/Message"
import { Link } from "react-router-dom"
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap"
import { addToCart, removeFromCart } from "../actions/cartActions"
import "./cartScreen.css"

const CartScreen = ({match, location, history }) => {

    const productId = match.params.id 


    const size  = location.search ? String(location.search.split("=")[1]) : "M"
    

    const dispatch = useDispatch()
    
    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping")
    }

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId,  size))
            
        }
    }, [dispatch, productId, size])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
        
    }


    

    return (
        <Row style={{"marginLeft":"3rem", "marginRight":"3rem"}}>
            <Col md={8}>
                <h2>Shopping Cart</h2>
                <br/>
                {cartItems.length === 0 ? ( <Message>Your cart is empty <Link to="/products"><strong>BVCK</strong></Link></Message> ) : (
                    <ListGroup variant="flush">
                        {cartItems.map(i => (
                            <ListGroup.Item key={i.product} style={{"backgroundColor":"black", "color":"white"}}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={i.image} alt={i.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${i.product}`} style={{"color":"white"}}>{i.name}</Link>
                                    </Col>
                                    <Col md={2}>{i.price}€</Col>

                                    <Col md={2}><strong>{ typeof(i.size) === "undefined" ? null : i.size }</strong></Col>

                                   
                                    
                                    <Col md={2}>
                                        <Button className="simpleButton" onClick={() =>
                                                removeFromCartHandler(i.product)}>
                                            <i className="fas fa-solid fa-skull-crossbones"></i>
                                        </Button>
                                    
                                    </Col>
                                </Row>
                            
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
                            <h3>SUBTOTAL</h3>
                            {cartItems.reduce((acc, cur) => acc + Number(cur.price), 0)}€
                        </ListGroup.Item>
                        <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
                            <button type="submit" className="btn effect01" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed to checkout
                            </button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
            
            
        
    )
}

export default CartScreen
