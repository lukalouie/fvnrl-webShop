import React, { useEffect } from 'react'
import {Row, Col} from "react-bootstrap"
import Product from "../components/Product"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listProducts } from '../actions/productActions'

function ProductScreen() {
    
    const dispatch = useDispatch()

    var productList = useSelector(state => state.productList)
    var {loading, error, products} = productList

    var cart = useSelector(state => state.cart)
    var { cartItems } = cart
    var cartPerm = []
    cartPerm = cartItems
    
    function checkProducts() {
        if (products !== undefined && cartPerm !== null) {
            products.forEach(element => {
                cartPerm.forEach(e => {
                    if(element._id === e.product) {
                        products = products.filter(el => el._id !== element._id)
                    }
                })
            });    
        }
        console.log(products)
    }

    function checkType(productos) {
        var uniqueTypes = [];
        var uniqueProducts = []
        productos.map(p => {
        if (uniqueTypes.indexOf(p.typeID) === -1) {
            uniqueTypes.push(p.typeID)
            uniqueProducts.push(p)
        }})
        return uniqueProducts
    }
    
    

    useEffect(() => {           
        dispatch(listProducts())
}, [dispatch])

    useEffect(() => {
        checkProducts()
    }, [cartPerm])


    
    return (
        <div className="productsBody">

         <h2 style={{textAlign:"center", color:"white"}}>BATCH#00</h2>
         {loading ? ( <Loader /> ) :  error ? ( <Message variant="danger">{error}</Message> ) 
        : (   
        <Row>
            {checkProducts()}
            {checkType(products).map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row> ) }
        </div>
    )
}

export default ProductScreen
