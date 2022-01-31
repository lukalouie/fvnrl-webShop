import React, {useState, useEffect} from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Form, Button, Row, Col, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUser } from "../actions/userActions"
import { USER_UPDATE_RESET } from "../constants/userConstants"
import { listOrders } from "../actions/orderActions"
import "./inputs.css"

function AccountScreen({ history, location }) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPass, setConfirmedPass] = useState("")
    const [message, setMessage] = useState(null)
    const [show, setShow] = useState(true)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success } = userUpdate

    const orderList = useSelector(state => state.orderList)
    const { loading:loadingOrders, error:errorOrders, orders } = orderList

    useEffect(() => {
        if(!userInfo) {
            history.push("/login")
        } else {
            if(!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_RESET})
                dispatch(getUserDetails("profile"))
                dispatch(listOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])


    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmedPass) {
            setMessage("Passwords do not match")
        } else {
            setShow(false)
            dispatch(updateUser({ id: user._id, name, email, password }))
        }
    }


    return (
        <Row style={{"marginLeft":"3rem", "marginRight":"3rem"}}>
            <Col md={3}>
            <h2>Account</h2>
            <br/>
            {message && show && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Account Updated</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <input type="text" name="name" className="question inputex" id="nme" value={name} requiredAutocomplete="off" onChange={(e) => setName(e.target.value)} />
                    <label className="labelex textareaex" for="nme" style={{"color":"white"}}><span className="spanex">Name?</span></label>
                </Form.Group>

                <Form.Group controlId="email">
                    <input type="email" name="email" className="question inputex" id="ml" value={email} requiredAutocomplete="off" onChange={(e) => setEmail(e.target.value)} />
                    <label className="labelex textareaex" for="ml" style={{"color":"white"}}><span className="spanex">Email Address?</span></label>
                </Form.Group>

                <Form.Group controlId="password">
                    <input className="question inputex" style={{"backgroundColor":"transparent"}} type="password" name="password" id="pswrd" value={password} requiredAutocomplete="off" onChange={(e) => setPassword(e.target.value)} />
                    <label className="labelex textareaex" for="pswrd" style={{"color":"white"}}><span className="spanex">Password?</span></label>
                </Form.Group>

                <Form.Group controlId="confirmedPass">
                    <input className="question inputex" type="password" name="confirmedPass" id="pswrdcnf" value={confirmedPass} requiredAutocomplete="off" onChange={(e) => setConfirmedPass(e.target.value)} />
                    <label className="labelex textareaex" for="pswrdcnf" style={{"color":"white"}}><span className="spanex">Confirm password!</span></label>
                </Form.Group>

            <button type="submit" className="btn effect01" variant="primary">
                UPDATE ACCOUNT
            </button>

        </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className="table-bordered" style={{"color":"white"}}>
                        <thead>
                            <tr>
                                <th>
                                    ID:
                                </th>
                                <th>
                                    DATE:
                                </th>
                                <th>
                                    TOTAL:
                                </th>
                                <th>
                                    PAID:
                                </th>
                                <th>
                                    DELIVERED:
                                </th>
                                <th>
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                
                                <tr key={order._id}>
                                    <td style={{"color":"white"}}>
                                        {order._id}
                                    </td>
                                    <td style={{"color":"white"}}>
                                        {order.createdAt.substring(0,10)}
                                    </td>
                                    <td style={{"color":"white"}}>
                                        {order.totalPrice}
                                    </td>
                                    <td style={{"color":"white"}}>
                                        {order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className="fas fa-times" style={{color: "red"}}></i>
                                    )}</td>
                                    <td style={{"color":"white"}}>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <i className="fas fa-times" style={{color: "red"}}></i>
                                    )}</td>
                                    <td style={{"color":"white"}}>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button type="submit"  className="simpleButton">Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}
export default AccountScreen
