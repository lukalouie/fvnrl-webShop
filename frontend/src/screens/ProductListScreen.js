import React, { useEffect} from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listProducts, deleteProduct, createProduct } from "../actions/productActions"
import { PRODUCT_CREATE_RESET } from "../constants/productConstants"

function ProductListScreen({history, match}) {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products } = productList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin) {
            history.push("/account")    
        }

        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <div style={{"marginLeft":"3rem", "marginRight":"3rem"}}>
        <Row className="align-items-center">
            <Col>
                <h2>Products</h2>
            </Col>
            <Col className="text-right" style={{"marginRight":"0", "padding":"0"}}>
                <button className="btn effect01 btnCreate" type="submit" variant="primary" onClick={createProductHandler}>
                    <i className="fas fa-plus"></i> 
                </button>
            </Col>
        </Row>
        <br/>
        <br/>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>
        : (
            <Table striped bordered hover responsive className="table-bordered" style={{"color":"white"}}>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            NAME
                        </th>
                        <th>
                            PRICE
                        </th>
                        <th>
                            CATEGORY
                        </th>
                        <th>
                            XS
                        </th>
                        <th>
                            S
                        </th>
                        <th>
                            M
                        </th>
                        <th>
                            L
                        </th>
                        <th>
                            XL
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td style={{"color":"white"}}>{product._id}</td>
                            <td style={{"color":"white"}}>{product.name}</td>
                            <td style={{"color":"white"}}>{product.price}</td>
                            <td style={{"color":"white"}}>{product.category}</td>
                            <td style={{"color":"white"}}>
                                {product.countAndSize.xs}
                            </td>
                            <td style={{"color":"white"}}>
                                {product.countAndSize.s}
                            </td>
                            <td style={{"color":"white"}}>
                                {product.countAndSize.m}
                            </td>
                            <td style={{"color":"white"}}>
                                {product.countAndSize.l}
                            </td>
                            <td style={{"color":"white"}}>
                                {product.countAndSize.xl}
                            </td>
                            <td style={{"color":"white"}}>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant="light" className="simpleButton">
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant="danger" className="simpleButton" onClick={() =>
                                deleteHandler(product._id)}>
                                    <i className="fas fa-solid fa-skull-crossbones"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
        </div>
    )
}

export default ProductListScreen