import React, {useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Image, ListGroup, ListGroupItem, Card, Dropdown } from "react-bootstrap"
import Rating from "../components/Rating"
import "./productScreen.css"
import { listProductDetails } from "../actions/productActions"
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'
import "./cartScreen.css"


function ProductScreen({history, match}) {

    const dispatch = useDispatch()

    const [size, setSize ] = useState("")

    const [backText, setBackText] = useState(false)

    const [typeID, setTypeID] = useState("")

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails




     function handleSize(val, p) {
         if (val !== "undefined") {
                setSize(val)
                setTypeID(p.typeID)

         }
         
     }

    
    function handleClicked() {
        setBackText(true)
    }
    
    function handleOut() {
        setBackText(false)
    }

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
        
    }, [dispatch, match]);

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, size))
        history.push(`/cart/${match.params.id}?size=${size}`)
        
    }

   
    
    

    const producto = (typeof(product) === 'undefined' ? null : product )


    return (
        <div style={{"marginLeft":"3rem", "marginRight":"3rem"}}>
            <Link className="fill my-3" to="/products" style={{textDecoration: backText ? "line-through" : "none", "color":"white", "borderColor":"white" }} onMouseOver={handleClicked} onMouseOut={handleOut}>
                BVCK
            </Link>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>
            :
            (<Row>
                <Col md={6}>
                    <Image src={producto.image} alt={producto.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush" className="p-5">
                        <ListGroupItem style={{"backgroundColor":"black", "color":"white"}}>
                            <h2>{producto.name}</h2>
                        </ListGroupItem>
                        <ListGroupItem style={{"backgroundColor":"black", "color":"white"}}>
                            <Rating value={producto.rating} text={`of ${producto.numReviews} reviews`} style={{"color":"white"}}/>
                        </ListGroupItem>
                        <ListGroupItem style={{"backgroundColor":"black", "color":"white"}}>
                            Price: {producto.price}€
                        </ListGroupItem>
                        <ListGroupItem style={{"backgroundColor":"black", "color":"white"}}>
                            {producto.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3} className="p-5">
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem style={{"backgroundColor":"black", "color":"white"}}>
                                <Row>
                                    <Col>
                                        PRICE:
                                    </Col>
                                    <Col>
                                        <strong>{producto.price}€</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem style={{"backgroundColor":"black", "color":"white"}}>
                                <Row>
                                    <Col>
                                        SIZE: <strong>{size}</strong>
                                    </Col>
                                    <Col>

                                        <Dropdown>
                                            <Dropdown.Toggle className="btn btn-dark" id="dropdown-basic" style={{"backgroundColor":"black"}}>
                                                Select Size
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item disabled={typeof(producto.countAndSize) == 'undefined' || producto.countAndSize.xs === 0} onClick={() => handleSize("XS", producto)}>XS</Dropdown.Item>
                                                <Dropdown.Item disabled={typeof(producto.countAndSize) == 'undefined' || producto.countAndSize.s === 0} onClick={() => handleSize("S", producto)}>S</Dropdown.Item>
                                                <Dropdown.Item disabled={typeof(producto.countAndSize) == 'undefined' || producto.countAndSize.m === 0} onClick={() => handleSize("M", producto)}>M</Dropdown.Item>
                                                <Dropdown.Item disabled={typeof(producto.countAndSize) == 'undefined' || producto.countAndSize.l === 0} onClick={() => handleSize("L", producto)}>L</Dropdown.Item>
                                                <Dropdown.Item disabled={typeof(producto.countAndSize) == 'undefined' || producto.countAndSize.xl === 0} onClick={() => handleSize("XL", producto)}>XL</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem style={{"backgroundColor":"black", "color":"white"}}>
                                <button className="btn effect01"
                                        type="submit"
                                        disabled={size === ""}
                                        onClick={addToCartHandler}
                                >Add To Cart</button>
                        </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>)}

            
            

        </div>    
        
    )
}

export default ProductScreen


